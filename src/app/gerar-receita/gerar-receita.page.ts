import { Component, OnInit } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { Filesystem, Directory } from '@capacitor/filesystem';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

interface Patologia {
  name: string;
  opcoes: Array<any>;
}

@Component({
  selector: 'app-gerar-receita',
  templateUrl: './gerar-receita.page.html',
  styleUrls: ['./gerar-receita.page.scss'],
})
export class GerarReceitaPage implements OnInit {

  medicacao:string
  pdf = null
  patientName:string
  apresentacao:string
  via:string
  time:string
  posologia:string
  patologia:string


  diagnostico: Patologia[] = [
    {
      name: "Gastroenterite Aguda (GEA)",
      opcoes: [
        {
          medicacao: "CIPROFLOXACINO (para Shigella/Campylobacter)",
          apresentacao: "1 COMP = 500 mg",
          posologia: "1 COMP 12/12h",
          via :	"ORAL",
          tempoTratamento:	"5 DIAS"
        },
        {
          medicacao: "METRONIDAZOL",
          apresentacao: "1 COMP = 250 mg",
          posologia:	"3 COMP 8/8h",
          via:	"ORAL",
          tempoTratamento: "5-10 DIAS"
        },
        {
          medicacao:	"CIPROFLOXACINO (para Campylobacter)",
          apresentacao:	"1 COMP = 600 mg",
          posologia:	"1 COMP 12/12h",
          via:	"ORAL",
          tempoTratamento:	"5 DIAS"
        }
      ]
    },
    {
      name: "Sinusite Aguda",
      opcoes: [
        {
          medicacao: "Ciprofloxacino (para Shigella/Campylobacter)",
          apresentacao: "1 COMP = 500 mg",
          posologia: "1 COMP 12/12h",
          via :	"ORAL",
          tempoTratamento:	"5 Dias"
        },
        {
          medicacao: "Metronidazol",
          apresentacao: "1 COMP = 250 mg",
          posologia:	"3 COMP 8/8h",
          via:	"ORAL",
          tempoTratamento: "5-10 Dias"
        },
        {
          medicacao:	"Ciprofloxacino (para Campylobacter)",
          apresentacao:	"1 COMP = 600 mg",
          posologia:	"1 COMP 12/12h",
          via:	"ORAL",
          tempoTratamento:	"5 Dias"
        }
      ]
    }
  ]

  constructor(public alertController: AlertController, 
              private platform: Platform, 
              private fileOpener: FileOpener,
              ) { }

  ngOnInit() { }

  selectDiag() {
    document.getElementById('medicamento').innerHTML = ''
    let id = parseInt((<HTMLSelectElement>document.getElementById('patologia')).value)
    let patologia = this.diagnostico[id]
    let optionsLenght = patologia.opcoes.length

    this.patologia = patologia.name

    for(let i = 0; i < optionsLenght; i++) {
      let element = document.createElement('ion-select-option')
      element.innerHTML = patologia.opcoes[i].medicacao
      element.value = i
      document.getElementById('medicamento').appendChild(element)
    }

    (<HTMLSelectElement>document.getElementById('medicamento')).value = '0';
    (<HTMLSelectElement>document.getElementById('apresentacao')).value = '';
    (<HTMLSelectElement>document.getElementById('posologia')).value = '';
    (<HTMLSelectElement>document.getElementById('via')).value = '';
    (<HTMLSelectElement>document.getElementById('tempo')).value = '';
  }

  selectMed() {
    let id = parseInt((<HTMLSelectElement>document.getElementById('patologia')).value)
    let i = parseInt((<HTMLSelectElement>document.getElementById('medicamento')).value);
    (<HTMLSelectElement>document.getElementById('apresentacao')).value = this.diagnostico[id].opcoes[i].apresentacao;
    (<HTMLSelectElement>document.getElementById('posologia')).value = this.diagnostico[id].opcoes[i].posologia;
    (<HTMLSelectElement>document.getElementById('via')).value = this.diagnostico[id].opcoes[i].via;
    (<HTMLSelectElement>document.getElementById('tempo')).value = this.diagnostico[id].opcoes[i].tempoTratamento

    this.medicacao = this.diagnostico[id].opcoes[i].medicacao
  }

  generate() {
    if((<HTMLSelectElement>document.getElementById('posologia')).value == undefined || 
       (<HTMLSelectElement>document.getElementById('medicamento')).value == undefined ||
       (<HTMLSelectElement>document.getElementById('medicamento')).value === '0' ||
       (<HTMLSelectElement>document.getElementById('nome')).value ==  '' ) {
       this.presentAlert()
       
    } else {
      let self = this
      pdfMake.vfs = pdfFonts.pdfMake.vfs;

      let pdfDefinition = {
        content: [
          {
            text: this.patientName + '\n\n'
          },
          {
            text: this.patologia  + '\n\n'
          },
          {
            text: this.medicacao  + '\n\n'
          },
          {
            text: this.apresentacao + '\n\n'
          },
          {
            text: this.posologia  + '\n\n'
          },
          {
            text: this.time + '\n\n'
          },
          {
            text: this.via
          }],
  
          styles: {
            pdf: {
              margin: [0, 0, 0, 0]
            },
            header: {
              fontSize: 18,
              bold: true,
              margin: [0, 0, 0, 15]
            },
          },
          images: {
            building: ''
          }
      }

      this.pdf = pdfMake.createPdf(pdfDefinition)

      if(this.platform.is('cordova')) {
        this.pdf.getBase64(async (data) => {
          try{
            let path = `pdfs/receita.pdf`
  
            const result = await Filesystem.writeFile({
              path,
              data: data,
              directory: Directory.Documents,
              recursive: true
            })
            this.fileOpener.open(`${result.uri}`, 'application/pdf')
          } catch(e) {
            console.log('Erro: ', e)
          }
        })
      } else {
        this.pdf.download('receita.pdf')
      }
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      subHeader: 'Preencha todos os campos',
      buttons: ['Fechar']
    });

    await alert.present();
  }
}
