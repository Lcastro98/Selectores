import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisesService } from '../../services/paises.service';
import { PaisSmall } from '../../interfaces/paises.interface';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    region: ['', Validators.required],
    pais: ['', Validators.required],
    frontera: ['', Validators.required]
  })

  regiones: string[] = [];
  paises: PaisSmall[] = [];

  constructor(private fb: FormBuilder,
              private paisesServices: PaisesService) { }

  ngOnInit(): void {
    this.regiones = this.paisesServices.regiones;

    // Cuando cambia la region
    this.miFormulario.get('region')?.valueChanges
      .pipe(
        tap((_) => {
          this.miFormulario.get('pais')?.reset('');
        }),
        switchMap(region =>  this.paisesServices.getPaisesPorRegion(region))
        )
        .subscribe( paises => {
          this.paises = paises;    
        })
    
    //Cuando cambia el pais
    this.miFormulario.get('pais')?.valueChanges
        .subscribe(codigo => console.log(codigo)
        )  
  }

  guardar() {
    console.log(this.miFormulario.value);
  }

}
