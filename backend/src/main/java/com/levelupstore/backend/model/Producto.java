package com.levelupstore.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;



@Entity
@Table(name = "PRODUCTO_G2")
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // el ID lo genera MySQL
    @Column(name = "id_prod")
    private Integer idProd;

    @Column(name = "nom_prod", nullable = false, length = 100)
    private String nombre;

    @Column(name = "descrip_pro", nullable = false, length = 100)
    private String descripcion;

    @Column(name = "precio", nullable = false)
    private Integer precio;

    // Getters y setters

    public Integer getIdProd() {
        return idProd;
    }

    public void setIdProd(Integer idProd) {
        this.idProd = idProd;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Integer getPrecio() {
        return precio;
    }

    public void setPrecio(Integer precio) {
        this.precio = precio;
    }
}
