import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

const datePipe = new DatePipe("es-AR");

@Injectable({
  providedIn: 'root'
})
export class FormaterService {

  constructor() { }

  // FECHAS

  /** Formato de año (YYYY) */
  year(date: Date) { return datePipe.transform(date, "YYYY") }

  /** Formato Date (dd/MM/YYYY) */
  date(date: Date) { return datePipe.transform(date, "dd/MM/YYYY") }

  /** Formato Timestamp (dd/MM/YYYY hh:mm:ss) */
  timestamp(date: Date) { return datePipe.transform(date, "dd/MM/YYYY hh:mm:ss") }

  requestDate(date: Date, lastHour = false): string { return (lastHour) ? datePipe.transform(date, "YYYY-MM-ddT23:59:00.000") + "Z" : datePipe.transform(date, "YYYY-MM-ddT00:00:00.000") + "Z" }

  requestFirstDateLastMonth(): string {
    let unMesAtras = new Date()
    unMesAtras.setMonth(unMesAtras.getMonth() - 1);
    unMesAtras.setDate(1);
    return datePipe.transform(unMesAtras, "YYYY-MM-ddT00:00:00.000") + "Z"
  }

  // FIN FECHAS

  // VALORES

  money(amount: number | string): string { return Number(amount) >= 0 ? `$ ${Number(amount).toFixed(2)}` : `- $ ${Math.abs(Number(amount)).toFixed(2)}`; }
  moneyDolar(amount: number | string): string { return `U$S ${Number(amount).toFixed(2)}`; }

  percentage(value: number | string): string { return `${Number(value).toFixed(2)} %`; }

  title(string: string): string {
    return string.charAt(0).toUpperCase().concat(string.slice(1).toLocaleLowerCase());
  }
  // FIN VALORES
}
