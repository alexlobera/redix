#Simple React Redux example using Redix containers to easly enable dependency injection
=====================

This example shows how to create presentational components and container components using the Redix container in a react-redux project. The example shows how to do two corner cases you may need:

### Your presentational component doesn't use propTypes.
Your components should always specify propTypes. propTypes are used by Redix to automatically map the props that your containers pass down to the presentational component. If for some reason your components don't use propTypes, you can explicitly tell Redix what are the props that you want to map by adding a parameter to this.setComponent; example:

Check this file src/containers/PhotoListContainer.js to see the example

### You don't want to pass the props.children of the container to the presentational component.
By default Redix will pass the props.children of the container to the presentational component. If you want to disable it, you can explicitly tell Redix not to do it by adding a parameter to this.setComponent; example:



Check this file src/containers/PhotoListContainer.js to see the example

## Usage

```
npm install
npm start
open http://localhost:3000
```

## Unit testing

This example project includes unit tests. There are examples using Facebook TestUtils, AirBnB Enzyme and Redix DI

```
npm test
```

## Resources

* [Post (coming soon)]()
* [Redix on Github](https://github.com/alexlbr/redix)
* Ping @alex_lobera on Twitter
