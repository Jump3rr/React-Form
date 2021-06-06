const sleep = (ms:number) => new Promise(resolve => setTimeout(resolve, ms));

export default (async function showResults (data:any) {
    await sleep(300);
    fetch('https://frosty-wood-6558.getsandbox.com:443/dishes', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: (`${JSON.stringify(data)}`)
    })
  
    .then((response) => {
      response.json()
      .then((data) => {
          alert(JSON.stringify(data, null, 2));
      });
    })
  });