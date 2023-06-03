CREATE TABLE producto (
   id serial PRIMARY KEY NOT NULL,
   nombre character varying(255) NOT NULL,
   precio numeric(10, 2) NOT NULL DEFAULT 0,
   cantidad integer NOT NULL DEFAULT 0,
   categoria character varying(20)
);

CREATE TABLE cliente (
   id serial PRIMARY KEY NOT NULL,
   nombre character varying(255) NOT NULL,
   telefono integer NOT NULL DEFAULT 0,
   email character varying(20)
);

CREATE TABLE venta (
   id serial PRIMARY KEY NOT NULL,
   cliente_id integer NOT NULL,
   total numeric(10, 2) NOT NULL DEFAULT 0,
   fecha timestamp,
	CONSTRAINT FK_venta_cliente FOREIGN KEY(cliente_id)
        REFERENCES cliente(id)
);

CREATE TABLE venta_detalle (
   id serial PRIMARY KEY NOT NULL,
   producto_id integer NOT NULL,
   venta_id integer NOT NULL,
   precio numeric(10, 2) NOT NULL DEFAULT 0,
	CONSTRAINT FK_venta_detalle_producto FOREIGN KEY(producto_id)
        REFERENCES producto(id),
	CONSTRAINT FK_venta_detalle_venta FOREIGN KEY(venta_id)
        REFERENCES venta(id)
);

CREATE TABLE usuario (
   id serial PRIMARY KEY NOT NULL,
   nombre character varying(255) NOT NULL,
   usuario character varying(255) NOT NULL, 
   password character varying(255) NOT NULL,
   email character varying(255) NOT NULL,
   rol character varying(255) NOT NULL
);


----------------------

CREATE OR REPLACE FUNCTION func_compras_cliente(_cliente_id integer)
    RETURNS TABLE (id integer,
               total numeric(10, 2),
               fecha timestamp)
    LANGUAGE 'plpgsql'
AS $BODY$

BEGIN
   RETURN QUERY
   select v.id, v.total, v.fecha from venta v
   inner join cliente c on c.id=v.cliente_id
   where c.id=_cliente_id;
END;
$BODY$;

----------------------
CREATE SCHEMA conta;

CREATE TABLE conta.cuenta (
   id serial PRIMARY KEY NOT NULL,
   nro_cuenta character varying(255) NOT NULL,
   gestion_id integer NOT NULL DEFAULT 0
);