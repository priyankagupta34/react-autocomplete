import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react'
import Footer from './components/Footer';

/* This is a dummy search input box which supports auto complete feature
  1. it saves search history in local but only upto 5 for all intents and purposes, as we don't want search list to increase too much.
  2. light css has been provided following theme to be 'torquiose', which can be modify as required.
  3. facility to remove search data is also implemented for those who would want to remove particulars.
  4. this reacts well with key up and down events and also featuring that on 'enter' it selects that option. 
   */

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      checkvalue: '',
      suggestion: [],
      selectedArray: [],
      showingsearchvalue: '',
      nextSibling: '',
      index: -1
    }
  }
  componentDidMount() {

    /* Adding listners for the drop down purpose */
    document.addEventListener("click", this.clickSomewhere.bind(this));
    document.addEventListener("keydown", this.onKeyDownToFocusViaSuggestion.bind(this), false);
  }
  componentWillUnmount() {

    /* Removing listners for the drop down purpose */
    document.removeEventListener("click", this.clickSomewhere.bind(this));
    document.removeEventListener("keydown", this.onKeyDownToFocusViaSuggestion.bind(this));
  }

  /* Method helps in navigating through the populated list  */
  onKeyDownToFocusViaSuggestion = (e) => {

    let mainOptionBody = document.getElementById('mainOptionBody');
    let next;
    if (typeof mainOptionBody !== undefined) {
      if (mainOptionBody !== null) {
        let length = mainOptionBody.getElementsByTagName(`li`).length - 1;

        /* When its ArrowDown pressed */
        if (e.which === 40) {
          this.setState({
            ...this.state,
            index: this.state.index + 1
          })
          if (this.state.nextSibling) {
            this.state.nextSibling.classList.remove('selectedOption');
            next = mainOptionBody.getElementsByTagName('li')[this.state.index];
            if (typeof next !== undefined && this.state.index <= length) {
              this.setState({
                ...this.state,
                nextSibling: next
              })
            } else {
              this.setState({
                ...this.state,
                index: 0,
                nextSibling: mainOptionBody.getElementsByTagName('li')[0]
              })
            }
            this.state.nextSibling.classList.add('selectedOption');
          } else {
            this.setState({
              ...this.state,
              index: 0,
              nextSibling: mainOptionBody.getElementsByTagName('li')[0]
            })
            this.state.nextSibling.classList.add('selectedOption');
          }
          this.state.nextSibling.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });

        }

        /* When arrowUp key is pressed */
        if (e.which === 38) {

          if (this.state.nextSibling) {
            this.state.nextSibling.classList.remove('selectedOption');
            this.setState({
              ...this.state,
              index: this.state.index - 1
            })
            next = mainOptionBody.getElementsByTagName('li')[this.state.index];
            if (typeof next !== undefined && this.state.index >= 0) {
              this.setState({
                ...this.state,
                nextSibling: next
              })
            } else {
              this.setState({
                ...this.state,
                index: length,
                nextSibling: mainOptionBody.getElementsByTagName('li')[length]
              })
            }
            this.state.nextSibling.classList.add('selectedOption');
          } else {
            this.setState({
              ...this.state,
              index: 0,
              nextSibling: mainOptionBody.getElementsByTagName('li')[length]
            })

            this.state.nextSibling.classList.add('selectedOption');
          }

          this.state.nextSibling.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });

        }

        /* When we enter on particular data which when is selected */
        if (e.which === 13) {
          this.setState({
            ...this.state,
            checkvalue: this.state.nextSibling.dataset.value,
            suggestion: []
          })
        }
      }

    }
  }

  /* When click has happened at another place if its not suggestion remove button, we are suppose to hide suggestion */
  clickSomewhere = (e) => {
    if (e.path[0].id !== 'hereInput' && e.path[0].className !== 'removeSuggestionBtn') {
      this.setState({
        ...this.state,
        checkvalue: this.state.checkvalue.trim(),
        selectedArray: [],
        suggestion: [],
        index: -1
      })
    }
  }

  /* When we click in input box, and expect suggestion to show up */
  onfocusDataShouldDisplay = (e) => {
    if (!this.state.checkvalue.includes('@')) {
      let words = JSON.parse(window.localStorage.getItem('words'));
      if (words) {
        words = words.reverse();
        this.setState({
          ...this.state,
          selectedType: '',
          index: -1,
          nextSibling: '',
          suggestion: words.filter(e => e.toLowerCase().includes(this.state.checkvalue)),
          showingsearchvalue: ''
        })
      }
    }
  }

  /* Various methods that we expect to see when user starts typing in the input box */
  openOptionArea = (e) => {

    this.setState({
      ...this.state,
      checkvalue: e.target.value,
      selectedArray: [],
      showingsearchvalue: '',
      suggestion: [],
      selectedType: '',
      index: -1,
    })

    let type = "", name = "";
    let typelist = [];
    if (e.target.value.includes('@')) {
      type = e.target.value.split('@')[1].split(" ")[0].toLowerCase();
      name = e.target.value.substr(e.target.value.indexOf(' ') + 1).toLowerCase()
    } else {
      name = e.target.value.toLowerCase()
    }

    /* Fetching our suggestion data */
    fetch('option.json').then(
      json => json.json()
    ).then(response => {

      if (type) {
        response.forEach(element => {
          if (element.type.toLowerCase() === type) {
            this.setState(state => {
              return {
                ...this.state,
                selectedArray: element.name,
                selectedType: element.type
              }
            })
          }
        });

        this.setState({
          ...this.state,
          suggestion: this.state.selectedArray.filter(e => e.toLowerCase().includes(name))
        });

      }

      if (this.state.checkvalue.charAt(0) === '@' && !this.state.checkvalue.includes(" ")) {
        response.forEach(element => {
          typelist.push('@' + element.type);
        });
        this.setState(state => {
          return {
            ...this.state,
            suggestion: typelist.filter(e => e.toLowerCase().includes(name))
          }
        })

      }

      let words = JSON.parse(window.localStorage.getItem("words"));
      if (this.state.checkvalue.charAt(0) !== '@' && words) {
        this.setState(state => {
          return {
            ...this.state,
            suggestion: words.filter(e => e.toLowerCase().includes(this.state.checkvalue))
          }
        })
      }


    })
      .catch(err => console.log("err", err));


  }

  /* Method that will invoke when search button is clicked, we are saving the data as well */
  btnSearchClick = (e) => {
    let words = JSON.parse(window.localStorage.getItem('words'));
    if (!words) {
      words = [];
    }
    if (!words.includes(this.state.checkvalue)) {
      if (words.length === 5) {
        words.shift();
      }
      words.push(this.state.checkvalue.trim());
    }
    this.setState({
      ...this.state,
      checkvalue: '',
      showingsearchvalue: `Search Happened: ${this.state.checkvalue}`
    })
    window.localStorage.setItem('words', JSON.stringify(words));
  }


  /* User gets the allowance to remove suggestion showing of recent search */
  removeSuggestion = (data, e) => {

    let words = JSON.parse(window.localStorage.getItem('words'));
    if (words.includes(data)) {
      words.splice(words.indexOf(data), 1);
      window.localStorage.setItem("words", JSON.stringify(words));
    }

    this.setState({
      ...this.state,
      suggestion: this.state.suggestion.splice(this.state.suggestion.indexOf(data), 1),
      checkvalue: ''
    });

  }

  /* This method will invoke as soon as user clicks on the option displaying */
  clickOption = (data, e) => {
    if (e.nativeEvent.path[0].className !== 'removeSuggestionBtn') {
      this.setState({
        ...this.state,
        checkvalue: data
      })
    } else {
      this.setState({
        ...this.state
      })
    }
  }


  render() {
    return (
      <div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className="centered"><h2>Auto-complete</h2></div>
        <div className="flexCenterN">

          <div>
            <div className="flex">
              <input id="hereInput"
                onChange={this.openOptionArea.bind(this)}
                value={this.state.checkvalue}
                className="inputArea"
                onFocus={this.onfocusDataShouldDisplay.bind(this)} />
              <button className="btnSearch" onClick={this.btnSearchClick.bind(this)}>&#8981;</button>
            </div>
            {this.state.suggestion.length !== 0 &&
              <div className="mainOptionBody" id="mainOptionBody">
                {this.state.suggestion.map((sug, index) => {
                  return (

                    <li key={index} className="optionArea spaceBetweened"
                      onClick={this.clickOption.bind(this, sug)}
                      id={`option${index}`}
                      data-value={sug}>
                      <div>
                        {sug}
                      </div>
                      {((this.state.checkvalue.charAt(0) !== '@' && this.state.selectedType === '')) &&
                        <button className="removeSuggestionBtn" onClick={this.removeSuggestion.bind(this, sug)}>x</button>
                      }
                    </li>

                  )
                })}
              </div>}

          </div>
        </div>

        <div className="showAfterSearch"><b>{this.state.showingsearchvalue}</b></div>

        <Footer />
      </div>
    )
  }
}

