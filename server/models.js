let db = require('./db.js');

let products = {
  getAll: () => {
    return db.pool.query('SELECT * FROM product LIMIT 5')
      .then(res => res.rows)
      .catch(e => console.error(e.stack))
  }
}

let product = {
  get: (id) => {
    let queryString = `SELECT json_build_object(
      'id', p.id,
      'name', p.name,
      'slogan', p.slogan,
      'description', p.description,
      'category', p.category,
      'default_price', p.default_price,
      'features', (select array_to_json(array_agg(row_to_json(t)))
      from (
        select feature, value from features where features.product_id = $1
      ) t)
    )
    FROM product p
    WHERE p.id = $1`

    return db.pool.query(queryString, [id])
      .then(res => res.rows[0].json_build_object)
      .catch(e => console.error(e.stack))
  }
}

let styles = {
  getAll: (id) => {
    let queryString = `SELECT json_build_object(
      'product_id', p.id,
      'results', (select array_to_json(array_agg(row_to_json(t)))
      from (
        select id as style_id, name, sale_price, original_price, default_style as default,
        (
          select array_to_json(array_agg(row_to_json(d)))
          from (
            select thumbnail_url, url
            from photos
            where photos.styleid = styles.id
          ) d
        ) as photos,
        (
          select array_to_json(array_agg(row_to_json(s)))
          from (
            select id, size, quantity
            from skus
            where skus.styleid = styles.id
          ) s
        ) as skus
        from styles where styles.productid = $1
      ) t)
    )
    FROM product p
    WHERE p.id = $1`
    return db.pool.query(queryString, [id])
      .then(res => res.rows[0].json_build_object)
      .catch(e => console.error(e.stack))
  }
}

let related = {
  getAll: (id) => {
    return db.pool.query('SELECT * FROM related WHERE current_product_id = $1', [id])
      .then(res => res.rows)
      .catch(e => console.error(e.stack))
  }
}

module.exports = {
  products,
  product,
  styles,
  related
};