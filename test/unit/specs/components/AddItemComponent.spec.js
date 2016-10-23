import Vue from 'vue'
import AddItemComponent from 'src/components/AddItemComponent'
import store from 'src/vuex/store'

describe('AddItemComponent.vue', () => {
  var component, addItemComponent;

  beforeEach(() => {
    component = new Vue(AddItemComponent).$mount()
    // load the component with a vue instance
    var vm = new Vue({
      template: '<div>' +
        '<add-item-component :items="items" :id="id" v-ref:add-item-component></add-item-component>' +
      '</div>',
      components: {
        AddItemComponent
      },
      data() {
        return {
          items: [],
          id: 'niceId'
        }
      },
      store
    }).$mount();

    addItemComponent = vm.$refs.addItemComponent;
  })

  describe('addItem', () => {
    it('should add item to the items array', () => {
      // fake the inputs
      component.items = []
      component.newItem = 'hello'
      component.updateList = () => {}
      // spy on the updateList function
      sinon.spy(component, 'updateList')
      // call the function we are testing
      component.addItem()
      // we expect that updateList method have been called
      expect(component.updateList).to.have.been.called
      // restore the spy
      component.updateList.restore()
      // we expect that items now have the inserted item object
      expect(component.items).to.eql([{text: 'hello', checked: false}])
    })
  })

  describe('AddItemComponent.vue', () => {
    it('should add item to the items array', () => {
      //spy on the updateList method
      sinon.stub(addItemComponent, 'updateList')
      //set the newItem property using $set method
      addItemComponent.$set('newItem', 'hello')
      //call the addItem method
      addItemComponent.addItem()
      //check that updateList method was called
      expect(addItemComponent.updateList).to.have.been.called
      addItemComponent.updateList.restore()
      //check the items property
      expect(addItemComponent.items).to.eql([{text: 'hello', checked: false}])
    })
  })
})
