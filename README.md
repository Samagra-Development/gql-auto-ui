# README.md

## Use Case: Get entity details and available queries from name

## Input Args: keyword: string, jfile: JSON Object (json object for intrspection.json)

## Output: Graphql Schema related to the object

### Example:
getEntityDetails("location", jfile) => {
  ```sh
  OBJECT location {
  block String,
  cluster String,
  district String,
  id Int,
  schools school,
  schools_aggregate school_aggregate
}

OBJECT location_aggregate {
  aggregate location_aggregate_fields,
  nodes location
}

OBJECT location_aggregate_fields {
  avg location_avg_fields,
  count Int,
  max location_max_fields,
  min location_min_fields,
  stddev location_stddev_fields,
  stddev_pop location_stddev_pop_fields,
  stddev_samp location_stddev_samp_fields,
  sum location_sum_fields,
  var_pop location_var_pop_fields,
  var_samp location_var_samp_fields,
  variance location_variance_fields
}

OBJECT location_avg_fields {
  id Float
}

INPUT_OBJECT location_bool_exp {
  _and location_bool_exp,
  _not location_bool_exp,
  _or location_bool_exp,
  block String_comparison_exp,
  cluster String_comparison_exp,
  district String_comparison_exp,
  id Int_comparison_exp,
  schools school_bool_exp
}

ENUM location_constraint {
  location_district_block_cluster_key,
  location_pkey
}

INPUT_OBJECT location_inc_input {
  id Int
}

INPUT_OBJECT location_insert_input {
  block String,
  cluster String,
  district String,
  id Int,
  schools school_arr_rel_insert_input
}

OBJECT location_max_fields {
  block String,
  cluster String,
  district String,
  id Int
}

OBJECT location_min_fields {
  block String,
  cluster String,
  district String,
  id Int
}

OBJECT location_mutation_response {
  affected_rows Int,
  returning location
}

INPUT_OBJECT location_obj_rel_insert_input {
  data location_insert_input,
  on_conflict location_on_conflict
}

INPUT_OBJECT location_on_conflict {
  constraint location_constraint,
  update_columns location_update_column,
  where location_bool_exp
}

INPUT_OBJECT location_order_by {
  block order_by,
  cluster order_by,
  district order_by,
  id order_by,
  schools_aggregate school_aggregate_order_by
}

INPUT_OBJECT location_pk_columns_input {
  id Int
}

ENUM location_select_column {
  block,
  cluster,
  district,
  id
}

INPUT_OBJECT location_set_input {
  block String,
  cluster String,
  district String,
  id Int
}

OBJECT location_stddev_fields {
  id Float
}

OBJECT location_stddev_pop_fields {
  id Float
}

OBJECT location_stddev_samp_fields {
  id Float
}

OBJECT location_sum_fields {
  id Int
}

ENUM location_update_column {
  block,
  cluster,
  district,
  id
}

OBJECT location_var_pop_fields {
  id Float
}

OBJECT location_var_samp_fields {
  id Float
}

OBJECT location_variance_fields {
  id Float
}
````
}