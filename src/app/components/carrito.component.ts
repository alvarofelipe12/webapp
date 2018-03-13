import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductoService } from '../services/producto.service';
import { error } from 'protractor';
import { Producto } from '../models/producto';
import { AppComponent } from '../app.component';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';


@Component({
    selector: 'carrito-list',
    templateUrl: '../views/carrito.html',
    providers: [ProductoService]
})
export class CarritoComponent {
    public titulo: string;
    public productos: Producto;
    public id;
    public producto: Producto;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _productoService: ProductoService,
        public afDB: AngularFireDatabase
    ) {
        this.titulo = 'Carrito de compras';
        this.id = this.zumaProd();

    }
    ngOnInit() {
        console.log('carrito.component.ts cargado...');
        this._productoService.getProductsCart(); // .subscribe(producto => {this.producto = producto; }));
        this.productos = this.getProductos(this.producto);
        // this.writeUserData(this.getProductos(this.producto));
    }
    getProductos(producto: Producto) {
        producto = JSON.parse(localStorage.getItem('id'));
        console.log(this.afDB.object('test/')); // .subscribe(producto => {this.producto = producto; }));
        return producto;
        // return this.afDB.object('test/' + producto.id);
    }
    zumaProd() {
        var d = JSON.parse(localStorage.getItem('id'));
        var rezult = d.map(a => a.precio);
        var acum = 0;
        for (let i = 0; i < rezult.length; i++) {
          acum = acum + parseInt(rezult[i], 10);
          }
        return acum;
    }
    clear() {
        localStorage.clear();
    }
    writeUserData(producto: Producto) {
        const itemRef = this.afDB.database.ref('test/').set(this.getProductos(producto));
        alert('Orden de compra registrada');
    }
}
