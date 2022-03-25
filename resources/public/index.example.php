<!doctype html>
<html lang="el">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="">
  <link rel="icon" href="data:;base64,iVBORw0KGgo=">
  <title></title>
  <?php
  if (file_exists(realpath(".") . '/assets/' . rev('vendor.css'))) {
    ?>
  <link rel="stylesheet" href="assets/<?= rev('vendor.css') ?>"><?php
  }
  if (file_exists(realpath(".") . '/assets/' . rev('app.css'))) { ?>
  <link rel="stylesheet" href="assets/<?= rev('app.css') ?>"><?php
  } ?>
</head>
<body>
  <?php
if (file_exists(realpath(".") . '/assets/' . rev('vendor.js'))) {
  ?>
  <script src="assets/<?= rev('vendor.js') ?>"></script><?php
}
if (file_exists(realpath(".") . '/assets/' . rev('app.js'))) {
  ?>
  <script src="assets/<?= rev('app.js') ?>"></script><?php
} ?>
</body>

</html>
<?php
