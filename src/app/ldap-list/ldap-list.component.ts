import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {UserLdap} from "../model/user-ldap";
import {MatPaginator} from "@angular/material/paginator";
import {LDAP_USERS} from "../model/ldap-mock-data";

@Component({
  selector: 'app-ldap-list',
  templateUrl: './ldap-list.component.html',
  styleUrls: ['./ldap-list.component.scss']
})
export class LdapListComponent implements OnInit {

  displayedColumns: string [] = ['nomComplet', 'mail', 'employeNumero'];
  dataSource = new MatTableDataSource<UserLdap>([])

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator

  constructor() { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getUsers();
  }

  private getUsers(): void{
    this.dataSource.data = LDAP_USERS;
  }

}
