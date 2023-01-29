import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  public menuItems: any;
  public usuario?: Usuario;

  constructor(
    private sideBarService: SidebarService,
    private usuarioService: UsuarioService
  ) {
    this.menuItems = sideBarService.menu;
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {}
}
