import { Component, OnDestroy, OnInit } from '@angular/core';
import { PersonasService } from "../../services/personas.service";
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-list-personas',
  templateUrl: './list-personas.component.html',
  styleUrls: ['./list-personas.component.scss']
})
export class ListPersonasComponent implements OnInit, OnDestroy {
  private unsuscribers$ = new Subject<void>();
  public filterName = '';
  public arrayPeople: any = [];
  constructor(private personaService: PersonasService) { }

  ngOnDestroy(): void {
    this.unsuscribers$.next();
    this.unsuscribers$.complete();
  }

  ngOnInit(): void {
    this.getListOfPeople();
  }

  getListOfPeople(): void {
    this.personaService.getAllPeople().pipe(takeUntil(this.unsuscribers$))
      .subscribe(response => {  
        
        this.arrayPeople = response;
      });
  }

  onDelete(idCliente: number) {
    Swal.fire({
      title: '¿Estas Seguro?',
      text: 'Estas por borrar este registro de tu base de datos',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Quiero borrarlo',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Eliminado!',
          'Haz borrado el registro!',
          'success'
        )
        this.personaService.deletePeople(idCliente).pipe(takeUntil(this.unsuscribers$))
          .subscribe(response => { this.getListOfPeople(); });;
 
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'No haz borrado el archivo',
          'error'
        )
      }
    })
  }



}
