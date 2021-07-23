import { Component, OnInit } from '@angular/core';

interface User {
  id: number;
  first: string;
  last: string;
}

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
          apresentacao:	"1 COMP = 500 mg",
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
          apresentacao:	"1 COMP = 500 mg",
          posologia:	"1 COMP 12/12h",
          via:	"ORAL",
          tempoTratamento:	"5 DIAS"
        }
      ]
    }
  ]

  users: User[] = [
    {
      id: 1,
      first: 'Alice',
      last: 'Smith',
    },
    {
      id: 2,
      first: 'Bob',
      last: 'Davis',
    },
    {
      id: 3,
      first: 'Charlie',
      last: 'Rosenburg',
    }
  ];

  compareWith(o1: User, o2: User) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  constructor() { }

  ngOnInit() {
  }

}
