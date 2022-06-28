import { LabelService } from './../../services/label.service';
import { UtillitiesService } from './../../services/utillities.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';
import { Label } from 'src/app/model/Label';
declare let $:any;


@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {

  public addFile = this.formBuilder.group({
    encabezado: ['', [Validators.required,
    Validators.maxLength(2000)]],
    file: ['', [Validators.required,
    Validators.maxLength(1000)]]
  });


  public tipo_aporte = "";
  public archivo !: File;
  oc_value: string = '';
  archivo_seleccionado: string = "";
  public formData = new FormData();
  public extension: string = "";
  public contenido: string = "";
  public listaEtiquetas: Array<Label> = [];
  public listaEtiquetasSeleccionadas: Array<Label> = [];


  constructor(private formBuilder: FormBuilder, private toastr: ToastrService,
    private labelService: LabelService) {
   }


  public mensaje: string = '';

  ngOnInit(): void {
  this.getListaEtiquetas();
  }

  cambioArchivoCargado(event: any): void {
    // console.log(event.target.files[0]);
    if (event.target.files && event.target.files[0]) {
      //  console.log(event.target.files[0].name);
      this.archivo = <File>event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => {
        reader.result;
        this.archivo_seleccionado = event.target.files[0].name;
        // datos_archivo = this.archivo_seleccionado.split(".");
        this.extension = this.archivo_seleccionado.slice((this.archivo_seleccionado.lastIndexOf(".") - 1 >>> 0) + 2);
        // console.log(this.extension);
      };
      reader.readAsDataURL(this.archivo);

    }
  }

  

  GuardarRecurso(){
    
  }

  getListaEtiquetas(){
    this.labelService.getEtiquetas().subscribe((res: any) => {

      if (res.ok === 1) {
        // this.router.navigate(['/']);
        // this.errores = '';
        this.listaEtiquetas = res.data as Array<Label>;
        console.log(this.listaEtiquetas);
      }
      else {
        // this.errores = res.mensaje;
        console.log('error');
      }
    })
  }

  CancelarCargaArchivo(){
    
    this.addFile.patchValue({
      file: ''
    });
    this.archivo_seleccionado="";
  }

  addEtiqueta(etiqueta:Label){
    if(!this.validarEtiquetaAgregada(etiqueta))
    this.listaEtiquetasSeleccionadas.push(etiqueta);
    else{
      this.toastr.info('Etiqueta ya fue agregada', 'Etiqueta Agregada')
    }

    // console.log(this.listaEtiquetasSeleccionadas)
  }

  validarEtiquetaAgregada(etiqueta:Label):boolean{
    // console.log('validando....')
    for (let index = 0; index < this.listaEtiquetasSeleccionadas.length; index++) {
      const etiqueta_ = this.listaEtiquetasSeleccionadas[index];
      if(etiqueta.id == etiqueta_.id){
        return true;
      }
    }
    return false;
  }

  deleteEspecialidad(indice:number){
      console.log(indice);
      this.listaEtiquetasSeleccionadas.splice(indice);
  }

}
