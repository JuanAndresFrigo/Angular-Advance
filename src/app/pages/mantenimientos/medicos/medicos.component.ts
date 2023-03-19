import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import { Medico } from 'src/app/models/medico.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css'],
})
export class MedicosComponent implements OnInit, OnDestroy {
  public cargando: boolean = true;
  public medicos: Medico[] = [];
  private imgSubs: Subscription = new Subscription();

  constructor(
    private medicosService: MedicoService,
    private modalImagenService: ModalImagenService,
    private busquedaService: BusquedasService
  ) {}

  ngOnInit(): void {
    this.cargarMedico();

    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(500))
      .subscribe((img) => this.cargarMedico());
  }

  public cargarMedico() {
    this.cargando = true;
    this.medicosService.cargarMedicos().subscribe((medicos) => {
      this.cargando = false;
      this.medicos = medicos;
    });
  }

  public abrirModal(medico: Medico) {
    this.modalImagenService.abrirModal('medicos', medico._id || '', medico.img);
  }

  public buscar(trermino: string) {
    if (trermino.length === 0) {
      return this.cargarMedico();
    }
    this.busquedaService
      .buscar('medicos', trermino)
      .subscribe((res: any[]) => (this.medicos = res));
  }

  public borrarMedico(medico: Medico){

    Swal.fire({
      title: '¿Borrar médico?',
      text: `Esta a punto de borrar a ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlo',
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicosService.borrarMedico(medico._id).subscribe((res) => {
          this.cargarMedico();
          Swal.fire(
            'Médcio borrado',
            `${medico.nombre} fue eliminado correctamente`,
            'success'
          );
        });
      }
    });

  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }
}
