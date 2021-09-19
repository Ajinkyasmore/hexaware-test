import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const $APIKey = '371d4e84f04f4e6eafe38174f3de11e5';
@Injectable({
  providedIn: 'root'
})
export class WeatherForecastService {

  constructor(private http: HttpClient) { }

  public getWeatherData(cityName){
    return this.http.get(`https://api.weatherbit.io/v2.0/forecast/daily?city=${cityName}&key=${$APIKey}`);
  }
}
