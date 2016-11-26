for (let i = 0; i < 10; i++) {
  import(`mod${$i}.js`)
    .then(module => console.log(module))
    .catch(err => console.log(err));
}
