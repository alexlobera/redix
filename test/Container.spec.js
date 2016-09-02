import { expect } from 'chai';
import { Container } from '../src/index';
import React from 'react';

const SomeComponent = props => (<i></i>);

SomeComponent.propTypes = {
  testFunc: React.PropTypes.func
}

const AnotherComponent = props => (<i></i>);

SomeComponent.propTypes = {
  testFunc: React.PropTypes.func
}

describe('Container bindThis', () => {
  it('should bind the name of a function in a component to the context of that component', () => {
    class SomeContainer extends Container {
      constructor(props) {
        super(props);
        this.setComponent(SomeComponent);
        this.bindThis('getName');
        this.name = 'foo';
      }
      getName() {
        return this.name;
      }
    }

    const container = new SomeContainer();

    const func = { getName: container.getName };
    expect(func.getName()).to.be.equal('foo');
  })

  it('should bind an array of names of functions in a component to the context of that component', () => {
    class SomeContainer extends Container {
      constructor(props) {
        super(props);
        this.setComponent(SomeComponent);
        this.bindThis(['getName', 'getLastname']);
        this.name = 'foo';
        this.lastname = 'bar';
      }
      getName() {
        return this.name;
      }
      getLastname() {
        return this.lastname;
      }
    }

    const container = new SomeContainer();

    const func = { getName: container.getName, getLastname: container.getLastname };
    expect(func.getName()+func.getLastname()).to.be.equal('foobar');
  })
});

describe('Container render', () => {
  it('should rendrer the component set by the setComponent method if there is not a prop called component', () => {
    class SomeContainer extends Container {
      constructor(props) {
        super(props);
        this.setComponent(SomeComponent);
      }
    }
    const props = {};
    const container = new SomeContainer(props);
    expect(container.render()).to.be.deep.equal(<SomeComponent testFunc={undefined} children={undefined} />);
  })

  it('should rendrer the component set by props if there is a prop called component', () => {
    class SomeContainer extends Container {
      constructor(props) {
        super(props);
        this.setComponent(SomeComponent);
      }
    }
    const props = { component: AnotherComponent};

    const container = new SomeContainer(props);

    expect(container.render()).to.be.deep.equal(<AnotherComponent testFunc={undefined} children={undefined} />);
  })

  it('should rendrer the props set by the setComponent method', () => {
    const props = { testFunc: () => {} }
    class SomeContainer extends Container {
      constructor(props) {
        super(props);
        this.setComponent(SomeComponent);
      }
    }
    const container = new SomeContainer(props);
    expect(container.render()).to.be.deep.equal(<SomeComponent testFunc={props.testFunc} children={undefined} />);
  })
});

describe('Container setCompnent', () => {
  it('should set the child component to this', () => {
    class SomeContainer extends Container {
      constructor(props) {
        super(props);
        this.setComponent(SomeComponent);
      }
    }

    const container = new SomeContainer();

    expect(container.childComponent).to.be.equal(SomeComponent);
  })

  it('should create a function that provides the properties the child component needs from the component propTypes', () => {
    const testFunc = () => {};
    class SomeContainer extends Container {
      constructor(props) {
        super(props);
        this.setComponent(SomeComponent)
      }
    }

    const container = new SomeContainer();

    expect(container.getChildProps.toString()).to.be.equal(`function anonymous(props
/**/) {
return {testFunc: this['testFunc'] || props['testFunc']}
}`);
  })

  it('should create a function that provides the properties the child component needs from the second parameter in setComponent { addProps }', () => {
    SomeComponent.propTypes = {
      users: React.PropTypes.array
    }
    class SomeContainer extends Container {
      constructor(props) {
        super(props);
        this.state = { users: []}
        this.setComponent(SomeComponent, {
          addProps: { users: 'this.state.users' }
        })
      }
    }

    const container = new SomeContainer();

    expect(container.getChildProps.toString()).to.be.equal(`function anonymous(props
/**/) {
return {users: this.state.users}
}`);
  })

  it('should create a function that provides the properties the child component needs from both the { addProps } parameter and the component propTypes', () => {
    const testFunc = () => {};
    SomeComponent.propTypes = {
      testFunc: React.PropTypes.func,
      users: React.PropTypes.array
    }
    class SomeContainer extends Container {
      constructor(props) {
        super(props);
        this.state = { users: []}
        this.setComponent(SomeComponent, {
          addProps: { users: 'this.state.users' }
        })
      }
    }

    const container = new SomeContainer();

    expect(container.getChildProps.toString()).to.be.equal(`function anonymous(props
/**/) {
return {testFunc: this['testFunc'] || props['testFunc'],users: this.state.users}
}`);
  })

  it('should map props that are functions to this if the option mapPropFuncs is true', () => {
    const testFunc = () => {};
    class SomeContainer extends Container {
      constructor(props) {
        super(props);
        this.setComponent(SomeComponent, {
          mapPropFuncsToThis: props
        });
      }
    }

    const container = new SomeContainer({testFunc});

    expect(container.testFunc).to.be.equal(testFunc);
  })

  it('should not map props that are functions to this if the option mapPropFuncs is not true', () => {
    const testFunc = () => {};
    class SomeContainer extends Container {
      constructor(props) {
        super(props);
        this.setComponent(SomeComponent);
      }
    }

    const container = new SomeContainer({testFunc});

    expect(container.testFunc).to.be.equal(undefined);
  })

  it('should not map to this props that are not functions', () => {
    const testFunc = {};
    SomeComponent.propTypes = {
      testFunc: React.PropTypes.object
    }
    class SomeContainer extends Container {
      constructor(props) {
        super(props);
        this.setComponent(SomeComponent, {
          mapPropFuncsToThis: props
        });
      }
    }

    const container = new SomeContainer({testFunc});

    expect(container.testFunc).to.be.equal(undefined);
  })
});
