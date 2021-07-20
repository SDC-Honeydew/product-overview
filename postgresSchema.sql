-- PRODUCT TABLE --
DROP TABLE IF EXISTS product;
CREATE TABLE product (

  id integer PRIMARY KEY,
  name VARCHAR,
  slogan VARCHAR,
  description VARCHAR,
  category VARCHAR,
  default_price INT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);


CREATE OR REPLACE FUNCTION update_created_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.created_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_product_createdtime BEFORE INSERT ON product FOR EACH ROW EXECUTE PROCEDURE  update_created_column();

CREATE OR REPLACE FUNCTION update_updated_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_product_updatedtime BEFORE INSERT OR UPDATE ON product FOR EACH ROW EXECUTE PROCEDURE  update_created_column();

-- \copy product from '/Users/aboussarath/Downloads/product.csv' delimiter ',' csv header;
\COPY product (id, name, slogan, description, category, default_price) from '/Users/aboussarath/Downloads/product.csv' delimiter ',' csv header;


-- FEATURES TABLE --
DROP TABLE IF EXISTS features;
CREATE TABLE features

(id integer PRIMARY KEY,
product_id INT,
feature VARCHAR,
value VARCHAR,
FOREIGN KEY (product_id)
      REFERENCES product (id)
);

\copy features from '/Users/aboussarath/Downloads/features.csv' delimiter ',' csv header;
--\copy features to '/Users/aboussarath/Desktop/features1.csv' delimiter ',' csv header;


-- STYLES TABLE --
DROP TABLE IF EXISTS styles;
CREATE TABLE styles

(id integer PRIMARY KEY,
productId INT,
name VARCHAR,
sale_price VARCHAR,
original_price INT,
default_style BOOLEAN,
FOREIGN KEY (productId)
      REFERENCES product (id)
);

\copy styles from '/Users/aboussarath/Downloads/styles.csv' delimiter ',' csv header;
--\copy styles to '/Users/aboussarath/Desktop/styles1.csv' delimiter ',' csv header;


-- PHOTOS TABLE --
DROP TABLE IF EXISTS photos;
CREATE TABLE photos

(id integer PRIMARY KEY,
styleId INT,
url VARCHAR,
thumbnail_url VARCHAR,
FOREIGN KEY (styleId)
      REFERENCES styles (id)
);

\copy photos from '/Users/aboussarath/Downloads/photos.csv' delimiter ',' csv header;
--\copy photos to '/Users/aboussarath/Desktop/photos1.csv' delimiter ',' csv header;


-- SKUS TABLE --
DROP TABLE IF EXISTS skus;
CREATE TABLE skus

(id integer PRIMARY KEY,
styleId INT,
size VARCHAR,
quantity INT,
FOREIGN KEY (styleId)
      REFERENCES styles (id)
);

\copy skus from '/Users/aboussarath/Downloads/skus.csv' delimiter ',' csv header;
--\copy skus to '/Users/aboussarath/Desktop/skus1.csv' delimiter ',' csv header;


-- RELATED TABLE --
DROP TABLE IF EXISTS related;
CREATE TABLE related

(id integer PRIMARY KEY,
current_product_id INT,
related_product_id INT,
FOREIGN KEY (current_product_id)
      REFERENCES product (id),
FOREIGN KEY (related_product_id)
      REFERENCES product (id)
);

CREATE OR REPLACE FUNCTION before_insert_relatedId()
RETURNS TRIGGER language plpgsql AS $$
BEGIN
    return case
        when new.related_product_id = 0 then null
        else new
    end;
END $$;

CREATE TRIGGER before_insert_relatedId
BEFORE INSERT ON related
FOR EACH ROW EXECUTE PROCEDURE before_insert_relatedId();

\copy related from '/Users/aboussarath/Downloads/related.csv' delimiter ',' csv header;
--\copy related to '/Users/aboussarath/Desktop/related1.csv' delimiter ',' csv header;