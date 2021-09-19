import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { WeatherForecastService } from 'src/app/services/weather-forecast.service';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.css']
})
export class WeatherForecastComponent implements OnInit {
  waetherForecastForm: FormGroup;
  waetherForecastData: any;
  showModelBool: boolean;
  errorShowBool: boolean;
  errorMessage: any;
  cityOptions = [];
  constructor(private fb: FormBuilder, private _weatherService: WeatherForecastService) { }

  ngOnInit() {
    this.cityOptions = [
      { name: 'Select City', value: '' },
      { name: 'Pune', value: 'Pune' },
      { name: 'Mumbai', value: 'Mumbai' },
      { name: 'Nagpur', value: 'Nagpur' },
      { name: 'Delhi', value: 'Delhi' },
      { name: 'Jaipur', value: 'Jaipur' },
    ];
    this.createForecastForm();
  }

  createForecastForm() {
    this.waetherForecastForm = this.fb.group({
      city: [this.cityOptions[0].value, [Validators.required]],
    });
  }

  fetchCityRecords() {
    let cityName = this.waetherForecastForm.value.city;
    console.log(cityName);
    if (this.waetherForecastForm.valid) {
      this.getWeatherData(cityName);
    } else {
      this.waetherForecastData = [];
      this.waetherForecastForm.get('city').markAsTouched();
    }
  }

  // weather forecast api call
  getWeatherData(cityName) {
    this._weatherService.getWeatherData(cityName).subscribe((res) => {
      if (res) {
        this.errorShowBool = false;
        let imageDesc = 'assets/icons/';
        this.waetherForecastData = [];
        this.waetherForecastData = res['data'].slice(0, 4);
        this.waetherForecastData.map(item => {
          item.imagePath = imageDesc + item.weather.icon + '.png';
        });
        console.log(this.waetherForecastData);
      }
    }, err => {
      this.errorShowBool = true;
      this.errorMessage = err.message;
    });
  }

  modelAction() {
    this.errorShowBool = false;
    this.showModelBool = !this.showModelBool;
    this.createForecastForm();
  }

}
