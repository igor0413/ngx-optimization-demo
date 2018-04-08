import { OnInit, Injectable } from "@angular/core";
import { TableService, Table } from "./table.service";

@Injectable()
export class VersionBase implements OnInit {
  public static readonly title: string;
  public readonly title: string;

  public table: Table = new Table();

  constructor(
    private tableService: TableService
  ) {
    this.title = new.target.title;
  }

  ngOnInit() {
    this.tableService.subscribe(table => this.table = table);
  }
}
