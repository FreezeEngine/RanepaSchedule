import React from "react";
import "@vkontakte/vkui/dist/vkui.css";
import "@vkontakte/vkui/";
//import SettinsMenu from "./menus/settings";

import {
  View,
  Panel,
  Epic,
  Tabbar,
  TabbarItem,
  PanelHeader,
  PanelHeaderBack,
  List,
  Div,
  Group,
  Header,
  ActionSheet,
  ActionSheetItem,
  Switch,
} from "@vkontakte/vkui";
import { Search, Cell } from "@vkontakte/vkui";
import Icon28UsersOutline from "@vkontakte/icons/dist/28/users_outline";
import Icon28UserOutline from "@vkontakte/icons/dist/28/user_outline";
import Rasp from "./menus/Rasp";
import Cookies from "universal-cookie";

var combined = [];
var groups = [];
var preps = [];

const cookies = new Cookies();

var schemeAttribute = document.createAttribute("scheme");
schemeAttribute.value = cookies.get("style");
document.body.attributes.setNamedItem(schemeAttribute);

class Tabs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      search: "",
      activeStory: "saved-rasp",
      activePanel: "search",
      SelectedGR: "",
      error: "",
      ID: "",
      Rtype: "",
      DefID: cookies.get("DefaultID"),
      DefGr: cookies.get("DefaultName"),
      DefType: cookies.get("DefaultType"),
      popout: null,
      main_color: "#ff7300",
	  text_color: "",
	  style: "Светлая"
    };
    this.onStoryChange = this.onStoryChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.ChangeStyles = this.ChangeStyles.bind(this);
  }
  Change = (e) => {
	  console.log(e)
	var schemeAttribute = document.createAttribute("scheme");
	schemeAttribute.value = e;
	document.body.attributes.setNamedItem(schemeAttribute);
	cookies.set("style", e, { path: "/" });
	if(cookies.get("style")!=="dark"|typeof cookies.get("style")==='undefined'){
		this.setState({
			style: 'Светлая',
		  });
	}else{
		this.setState({
			style: 'Тёмная',
		  });
	}
  }

  ChangeStyles() {
    this.setState({
      popout: (
        <ActionSheet onClose={() => this.setState({ popout: null })}>
          <ActionSheetItem autoclose onClick={()=>this.Change('light')}>Светлая</ActionSheetItem>
          <ActionSheetItem autoclose onClick={()=>this.Change('dark')}>Тёмная</ActionSheetItem>
          {
            <ActionSheetItem autoclose mode="cancel">
              Отменить
            </ActionSheetItem>
          }
        </ActionSheet>
      ),
    });
  }
  componentDidMount() {
    this.setState({
      isLoaded: false,
	});
	if(cookies.get("style")!=="dark"|typeof cookies.get("style")==='undefined'){
		this.setState({
			style: 'Светлая',
		  });
	}else{
		this.setState({
			style: 'Тёмная',
		  });
	}
    /*if (typeof cookies.get("DefaultID") === "undefined") {
      cookies.set("DefaultID", "", { path: "/" });
      cookies.set("DefaultName", "", { path: "/" });
	  cookies.set("DefaultType", "3", { path: "/" });
	  cookies.set("style", "light", { path: "/" });
	}*/

//console.log(cookies.get("DefaultType")) "http://services.niu.ranepa.ru/API/public/teacher/teachersAndGroupsList"
try{
    fetch(
      "https://ranepaschedule.000webhostapp.com/GetGroupsAndTeachers.php"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          var i = 0;
          combined = Object.keys(result).map((groups) => result[i++]);
          groups = combined.filter(({ type }) => type.indexOf("0") > -1);
          preps = combined.filter(({ type }) => type.indexOf("1") > -1);
          this.setState({
            isLoaded: true,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
}catch{
  fetch(
    "https://ranepaschedule.000webhostapp.com/GetGroupsAndTeachers.php"
  )
    .then((res) => res.json())
    .then(
      (result) => {
        var i = 0;
        combined = Object.keys(result).map((groups) => result[i++]);
        groups = combined.filter(({ type }) => type.indexOf("0") > -1);
        preps = combined.filter(({ type }) => type.indexOf("1") > -1);
        this.setState({
          isLoaded: true,
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error,
        });
      }
    );
}
  }
  
SaveDefaultRasp = (settings) => {
	cookies.set("DefaultID", settings.id, { path: "/" });
	cookies.set("DefaultName", settings.name, { path: "/" });
	cookies.set("DefaultType", settings.type , { path: "/" });
	this.setState({
		activePanel: "saved-rasp",
		activeStory: "saved-rasp",
		search: ""
	  })
	  this.setState({
        DefID: cookies.get("DefaultID"),
        DefGr: cookies.get("DefaultName"),
        DefType: cookies.get("DefaultType"),
	  });
	  console.log(cookies.get("DefaultType"));
}
  onStoryChange(e) {
    this.setState({
      activeStory: e.currentTarget.dataset.story,
      activePanel: e.currentTarget.dataset.story,
      search: "",
    });
  }
  onChange(e) {
    this.setState({ search: e.target.value });
  }
  SearchPop = () => {
    this.setState({ activeStory: "settings", activePanel: "rs", search: "" });
  };

  get groups() {
    const search = this.state.search.toLowerCase();
    var s;
    if (this.state.isLoaded === true) {
      switch (search.length) {
        case 1:
          return (s = groups.filter(
            ({ value }) => value.substr(0, 1).toLowerCase().indexOf(search) > -1
          ));
        case 2:
          return (s = groups.filter(
            ({ value }) => value.substr(0, 2).toLowerCase().indexOf(search) > -1
          ));
        default:
          return (s = groups.filter(
            ({ value }) => value.toLowerCase().indexOf(search) > -1
          ));
      }
    }
    return s;
  }
  get preps() {
    const search = this.state.search.toLowerCase();
    var s;
    if (this.state.isLoaded === true) {
      switch (search.length) {
        case 1:
          return (s = preps.filter(
            ({ value }) => value.substr(0, 1).toLowerCase().indexOf(search) > -1
          ));
        case 2:
          return (s = preps.filter(
            ({ value }) => value.substr(0, 2).toLowerCase().indexOf(search) > -1
          ));
        default:
          return (s = preps.filter(
            ({ value }) => value.toLowerCase().indexOf(search) > -1
          ));
      }
    }
    return s;
  }
  render() {
    
    return (
      <div>
        <Epic
          activeStory={this.state.activeStory}
          tabbar={
            <Tabbar>
              <TabbarItem
                onClick={this.onStoryChange}
                selected={this.state.activeStory === "saved-rasp"}
                data-story="saved-rasp"
                text="Расписание"></TabbarItem>
              <TabbarItem
                onClick={this.onStoryChange}
                selected={this.state.activeStory === "search"}
                data-story="search"
                text="Поиск"></TabbarItem>
              <TabbarItem
                onClick={this.onStoryChange}
                selected={this.state.activeStory === "settings"}
                data-story="settings"
                text="Настройки"></TabbarItem>
            </Tabbar>
          }>
          <View id="saved-rasp" activePanel="saved-rasp">
            <Panel id="saved-rasp">
              <PanelHeader>Расписание</PanelHeader>
              <Rasp
                id={this.state.DefID}
                type={this.state.DefType}
                grname={this.state.DefGr}
                SearchPop={this.SearchPop}></Rasp>
            </Panel>
          </View>
          <View id="search" activePanel={this.state.activePanel}>
            <Panel id="search">
              <React.Fragment>
                <PanelHeader separator={false}>Найти группу</PanelHeader>

                <Search
                  value={this.state.search}
                  onChange={this.onChange}
                  after={null}
                />

                {this.state.search !== "" && (
                  <List>
                    {typeof this.groups !== 'undefined'&&this.groups.slice(0, 10).map((group) => (
                      <Cell
                        onClick={() =>
                          this.setState({
                            SelectedGR: group.value,
                            ID: group.oid,
                            Rtype: 0,
                            activePanel: "rasp",
                          })
                        }
                        before={<Icon28UsersOutline />}
                        expandable
                        key={group.oid}>
                        {group.value}
                      </Cell>
                    ))}
                    {typeof this.preps !== 'undefined'&&this.preps.slice(0, 10).map((prep) => (
                      <Cell
                        onClick={() =>
                          this.setState({
                            SelectedGR: prep.value,
                            ID: prep.oid,
                            Rtype: 1,
                            activePanel: "rasp",
                          })
                        }
                        before={<Icon28UserOutline />}
                        expandable
                        key={prep.oid}>
                        {prep.value}
                      </Cell>
                    ))}
                  </List>
                )}
              </React.Fragment>
            </Panel>

            <Panel id="rasp">
              <PanelHeader
                separator={false}
                left={
                  <PanelHeaderBack
                    onClick={() => this.setState({ activePanel: "search" })}
                  />
                }>
                {this.state.SelectedGR.length > 9 &&
                  this.state.SelectedGR.split(" ")[0] +
                    " " +
                    this.state.SelectedGR.split(" ")[1][0] +
                    "." +
                    this.state.SelectedGR.split(" ")[2][0] +
                    "."}
                {this.state.SelectedGR.length < 9 && this.state.SelectedGR}
              </PanelHeader>

              <Rasp
                id={this.state.ID}
                type={this.state.Rtype}
                grname={this.state.SelectedGR}></Rasp>
            </Panel>
          </View>
          <View id="tasks" activePanel="tasks">
            <Panel id="tasks">
              <PanelHeader>Задания</PanelHeader>
            </Panel>
          </View>
          <View
            id="settings"
            activePanel={this.state.activePanel}
            popout={this.state.popout}>
            <Panel id="settings">

              <PanelHeader>Настройки</PanelHeader>

              <Div>
                <div>
                  <Group
                    header={<Header mode="secondary">Расписание</Header>}
                    description="Выберете свою группу что бы всегда попадать на страницу с вашим расписанием"
                    separator="show">
                    <Cell
                      indicator="Выбрать"
                      expandable
                      onClick={() => this.setState({ activePanel: "rs" })}>
                      Группа
                    </Cell>
                  </Group>
                </div>

                <Group
                  header={<Header mode="secondary">Дополнительно</Header>}
                  
                  separator="show">
                  <Cell
                  indicator={this.state.style}
                  expandable
                  onClick={this.ChangeStyles}>
                  Тема
                </Cell>
                </Group>

                
              </Div>
            </Panel>

            <Panel id="rs">
              <PanelHeader
                left={
                  <PanelHeaderBack
                    onClick={() => this.setState({ activePanel: "settings" })}
                  />
                }>
                Выбор группы
              </PanelHeader>
              <Search value={this.state.search} onChange={this.onChange} />
              {this.state.search !== "" && (
                <List>
                  {typeof this.groups !== 'undefined'&&this.groups.slice(0, 10).map((group) => (
                    <Cell
					onClick={() =>
                        this.SaveDefaultRasp({id: group.oid,name: group.value,type: 0})
                      }
                      
                      before={<Icon28UsersOutline />}
                      expandable
                      key={group.oid}>
                      {group.value}
                    </Cell>
                  ))}
                  {typeof this.preps !== 'undefined'&&this.preps.slice(0, 10).map((prep) => (
                    <Cell
                      onClick={() =>
						this.SaveDefaultRasp({id: prep.oid,name: prep.value,type: 1})
                      }
                      before={<Icon28UserOutline />}
                      expandable
                      key={prep.oid}>
                      {prep.value}
                    </Cell>
                  ))}
                </List>
              )}
            </Panel>
          </View>
        </Epic>
      </div>
    );
  }
}
//cookies.set('DefaultID', '', { path: '/' });
//cookies.set('DefaultName', '', { path: '/' });
//cookies.set('DefaultType', '', { path: '/' });
export default Tabs;
