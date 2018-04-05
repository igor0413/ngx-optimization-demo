/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

interface ICell extends Array<string> {
  entered?: string;
}

interface ITable extends Array<Array<ICell>> {

}
