
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import * as qz from 'qz-tray';
// declare var qz: any;


@Injectable()
export class PrinterService {
  constructor() {}

  errorHandler(error: any): Observable<any> {
    return throwError(error);
  }
    
  // Get list of printers connected
  getPrinters(): Observable<string[]> {
    return from(qz.websocket.connect().then(() => qz.printers.find())).pipe(
      map((printers: string[]) => printers));
  }
    
  // Get the SPECIFIC connected printer
  getPrinter(printerName: string): Observable<string> {
    return from(qz.websocket.connect().then(() => qz.printers.find(printerName))).pipe(
      map((printer: string) => printer))
      // .catch(this.errorHandler);
  }
    
  // Print data to chosen printer
  printData(printer: string, data: any): Observable<any> {
    // Create a default config for the found printer
    const config = qz.configs.create(printer);
    return from(qz.print(config, data)).pipe(
      map((anything: any) => anything))
      // .catch(this.errorHandler);
  }
   
  // Disconnect QZ Tray from the browser
  removePrinter(): void {
     qz.websocket.disconnect();
  }
}