import { Component, OnInit, Inject } from '@angular/core';
import * as jsPDF from 'jspdf'
@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css'],
  providers: [
    { provide: 'Window',  useValue: window }
  ]
})
export class PdfComponent implements OnInit {

  constructor(
    @Inject('Window') private window: Window,
    ) { }

  ngOnInit() {
  }

  download() {

        var doc = new jsPDF();
        doc.text(20, 20, 'Hello world!');
        doc.text(20, 30, 'This is client-side Javascript, pumping out a PDF.');
        doc.addPage();
        doc.text(20, 20, 'http://www.coding4developers.com/');

        // Save the PDF
        doc.save('Test.pdf');
    }

}
