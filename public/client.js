const myapikey ='';

/**
 * Exp 1: personalized-recomendations
 * 
 * @author: Aaron Montana
 * 
 * 
 * Users will be targeted based on a parameter passed in the URL.
 * This is similar to any kind of campaign based targeting where we might want to serve different 
 * variations to this particular group of users to see their outcomes vs a control group. 
 * 
 * To trigger this experiment use:
 * ?ref=starwars
 *  
 */


//We will grab URL parameters to create the targeting for out experiment.
let params = (new URL(document.location)).searchParams;
let campValue = params.get('ref');

/**
 * We wil also create some random users and reasonably unique key.
 * For a true experiment, we would absolutley want to allow anonymous users, 
 * binding the them to a known user if they login later. In this case 
 * we want to see some simple results in the Users dashboard.
 * 
 */

    let names = ['luke', 'leia', 'han', 'lando', 'boba', 'chewy', 'K-2SO', 'greedo'];
    names.sort(()=> Math.random() - 0.5);
    let firstName = names[1];
    let userKey = (+new Date).toString(36)

//We will pass in the url parameter value as a custom user parameter 
const user = {
    key: userKey,
    firstName: firstName,
    custom: {
        camp: campValue
    }
};


// Create a new LDClient instance with your environment-specific SDK key
var ldclient = LDClient.initialize(myapikey, user);

ldclient.on('ready', () => {
    // initialization succeeded, flag values are now available
    var flagValue = ldclient.variation('personalized-recomendations', false);
    console.log("SDK successfully connected! The value of personalized-recomendations is " + flagValue + " for " + firstName);
   
    /**
     * Here we trigger the experiment. In this case the rule has been set to a
     * 50:50 split, creating a control group. We'll want to compare the outcomes 
     * of each group within the targeted group. 
     */
    if(flagValue === true){
        productLayoutRender('star wars');     
    }

});


//Basic search functionality
document.addEventListener('submit', ev => {
    if (ev.target.id == 'search') {
        const input = document.querySelector('[name="productSearch"]');
        console.log('Search was: ' + input.value);
        ev.preventDefault();

        productLayoutRender(input.value);

        input.value = '';

        
    }
});

/**
 * Render the product layout from API results.
 * @param {String} searchTerm 
 */
function productLayoutRender(searchTerm ) {

    fetch('/products?name[$like]=*' + encodeURIComponent(searchTerm) + '*&$limit=4')
        .then(response => response.json())
        .then(function (data) {

            let productArray = data.data;

            let products = document.querySelector('#products');

            products.innerHTML = '';

            productArray.forEach(element => {

                let item = document.createElement("div");
                item.className = "three columns product";
                item.setAttribute("id", element.id);

                let image = document.createElement("img");
                image.setAttribute('src', element.image);
                image.className = "productImage";

                let title = document.createElement("h6");
                title.textContent = element.name;
                title.className = "productTitle";

                let desc = document.createElement("div");
                desc.textContent = element.description
                desc.className = "productDesc";

                let price = document.createElement("pre");
                price.textContent = "$" + element.price;
                price.className = "productPrice";


                item.appendChild(desc);
                item.appendChild(image);
                item.appendChild(desc);
                item.appendChild(price);

                products.appendChild(item);

            });
        });
}

