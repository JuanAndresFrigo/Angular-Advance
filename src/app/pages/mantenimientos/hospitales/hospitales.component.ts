import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css'],
})
export class HospitalesComponent implements OnInit, OnDestroy {
  public hospitales: Hospital[] = [];
  public cargando: boolean = true;

  private imgSubs: Subscription = new Subscription();

  constructor(
    private hospitalService: HospitalService,
    private modalImagenService: ModalImagenService,
    private busquedaService: BusquedasService
  ) {}

  ngOnInit(): void {
    this.cargarHospitales();

    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(500))
      .subscribe((img) => this.cargarHospitales());
  }

  public buscar(trermino: string) {
    if (trermino.length === 0) {
      return this.cargarHospitales();
    }
    this.busquedaService
      .buscar('hospitales', trermino)
      .subscribe((res: any[]) => (this.hospitales = res));
  }

  public cargarHospitales() {
    this.cargando = true;

    this.hospitalService
      .cargarHospitales()
      .subscribe((hospitales: Hospital[]) => {
        this.cargando = false;
        this.hospitales = hospitales;
      });
  }

  public guardarCambios(hospital: Hospital) {
    this.hospitalService
      .actualizarHospitales(hospital._id, hospital.nombre)
      .subscribe((resp) => {
        Swal.fire('Actualizado', hospital.nombre, 'success');
      });
  }

  public eliminarHospital(hospital: Hospital) {
    this.hospitalService.borrarHospitales(hospital._id).subscribe((resp) => {
      this.cargarHospitales();
      Swal.fire('Borrado', hospital.nombre, 'success');
    });
  }

  public async abrirSweetAlert() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true,
    });

    if (value?.trim().length > 0) {
      this.hospitalService.crearHospitales(value).subscribe((res: any) => {
        this.hospitales.push(res.hospital);
      });
    }
  }

  public abrirModal(hospital: Hospital) {
    this.modalImagenService.abrirModal(
      'hospitales',
      hospital._id || '',
      hospital.img
    );
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }
}
