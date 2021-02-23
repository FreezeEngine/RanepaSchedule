import React from "react";
import "@vkontakte/vkui/dist/vkui.css";
import "@vkontakte/vkui/";
import bridge from "@vkontakte/vk-bridge";
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
} from "@vkontakte/vkui";
import { Search, Cell } from "@vkontakte/vkui";
import Icon28UsersOutline from "@vkontakte/icons/dist/28/users_outline";
import Icon28UserOutline from "@vkontakte/icons/dist/28/user_outline";
import Schedule from "./menus/Schedule";
import Cookies from "universal-cookie";
import { object } from "prop-types";

var combined = [];
var groups = [];
var preps = [];

const cookies = new Cookies();

var schemeAttribute = document.createAttribute("scheme");
schemeAttribute.value = cookies.get("style");
document.body.attributes.setNamedItem(schemeAttribute);
const STORAGE_KEYS = {
  THEME: "light",
  ID: null,
  NAME: null,
  TYPE: null,
};

class MainFrame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      Search: "",
      activeStory: "SavedSchedule",
      activePanel: "Search",
      SelectedGR: "",
      error: "",
      ID: "",
      ScheduleType: "",
      DefID: cookies.get("DefaultID"),
      DefGr: cookies.get("DefaultName"),
      DefType: cookies.get("DefaultType"),
      popout: null,
      main_color: "#ff7300",
      text_color: "",
      style: "Светлая",
    };
    this.onStoryChange = this.onStoryChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.ChangeStyles = this.ChangeStyles.bind(this);
  }
  async fetchData() {
    const storageData = await bridge.send("VKWebAppStorageGet", {
      keys: Object.values(STORAGE_KEYS),
    });
  }
  Change = (e) => {
    console.log(e);
    var schemeAttribute = document.createAttribute("scheme");
    schemeAttribute.value = e;
    document.body.attributes.setNamedItem(schemeAttribute);
    cookies.set("style", e, { path: "/" });
    if (
      (cookies.get("style") !== "dark") |
      (typeof cookies.get("style") === "undefined")
    ) {
      this.setState({
        style: "Светлая",
      });
    } else {
      this.setState({
        style: "Тёмная",
      });
    }
  };

  ChangeStyles() {
    this.setState({
      popout: (
        <ActionSheet onClose={() => this.setState({ popout: null })}>
          <ActionSheetItem autoclose onClick={() => this.Change("light")}>
            Светлая
          </ActionSheetItem>
          <ActionSheetItem autoclose onClick={() => this.Change("dark")}>
            Тёмная
          </ActionSheetItem>
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
    if (
      (cookies.get("style") !== "dark") |
      (typeof cookies.get("style") === "undefined")
    ) {
      this.setState({
        style: "Светлая",
      });
    } else {
      this.setState({
        style: "Тёмная",
      });
    }

    try {
      fetch("https://ranepaschedule.000webhostapp.com/GetGroupsAndTeachers.php")
        .then((res) => res.json())
        .then(
          (result) => {
            var i = 0;
            combined = Object.keys(result).map(() => result[i++]);
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
    } catch {
      fetch("https://ranepaschedule.000webhostapp.com/GetGroupsAndTeachers.php")
        .then((res) => res.json())
        .then(
          (result) => {
            var i = 0;
            combined = Object.keys(result).map(() => result[i++]);
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

  SaveDefaultSchedule = (settings) => {
    cookies.set("DefaultID", settings.id, { path: "/" });
    cookies.set("DefaultName", settings.name, { path: "/" });
    cookies.set("DefaultType", settings.type, { path: "/" });
    this.setState({
      activePanel: "SavedSchedule",
      activeStory: "SavedSchedule",
      Search: "",
    });
    this.setState({
      DefID: cookies.get("DefaultID"),
      DefGr: cookies.get("DefaultName"),
      DefType: cookies.get("DefaultType"),
    });
    console.log(cookies.get("DefaultType"));
  };
  onStoryChange(e) {
    this.setState({
      activeStory: e.currentTarget.dataset.story,
      activePanel: e.currentTarget.dataset.story,
      Search: "",
    });
  }

  onChange(e) {
    this.setState({ Search: e.target.value });
  }

  SearchPop = () => {
    this.setState({ activeStory: "settings", activePanel: "rs", Search: "" });
  };

  get groups() {
    const Search = this.state.Search.toLowerCase();
    var s;
    if (this.state.isLoaded === true) {
      switch (Search.length) {
        case 1:
          return (s = groups.filter(
            ({ value }) => value.substr(0, 1).toLowerCase().indexOf(Search) > -1
          ));
        case 2:
          return (s = groups.filter(
            ({ value }) => value.substr(0, 2).toLowerCase().indexOf(Search) > -1
          ));
        default:
          return (s = groups.filter(
            ({ value }) => value.toLowerCase().indexOf(Search) > -1
          ));
      }
    }
    return s;
  }
  get preps() {
    const Search = this.state.Search.toLowerCase();
    var s;
    if (this.state.isLoaded === true) {
      switch (Search.length) {
        case 1:
          return (s = preps.filter(
            ({ value }) => value.substr(0, 1).toLowerCase().indexOf(Search) > -1
          ));
        case 2:
          return (s = preps.filter(
            ({ value }) => value.substr(0, 2).toLowerCase().indexOf(Search) > -1
          ));
        default:
          return (s = preps.filter(
            ({ value }) => value.toLowerCase().indexOf(Search) > -1
          ));
      }
    }
    return s;
  }
  render() {
    return (
      <Epic
        activeStory={this.state.activeStory}
        tabbar={
          <Tabbar>
            <TabbarItem
              onClick={this.onStoryChange}
              selected={this.state.activeStory === "SavedSchedule"}
              data-story="SavedSchedule"
              text="Расписание"></TabbarItem>
            <TabbarItem
              onClick={this.onStoryChange}
              selected={this.state.activeStory === "Search"}
              data-story="Search"
              text="Поиск"></TabbarItem>
            <TabbarItem
              onClick={this.onStoryChange}
              selected={this.state.activeStory === "settings"}
              data-story="settings"
              text="Настройки"></TabbarItem>
          </Tabbar>
        }>
        <View id="SavedSchedule" activePanel="SavedSchedule">
          <Panel id="SavedSchedule">
            <PanelHeader>Расписание</PanelHeader>
            <Schedule
              id={this.state.DefID}
              type={this.state.DefType}
              grname={this.state.DefGr}
              SearchPop={this.SearchPop}></Schedule>
          </Panel>
        </View>
        <View id="Search" activePanel={this.state.activePanel}>
          <Panel id="Search">
            <React.Fragment>
              <PanelHeader separator={false}>Найти группу</PanelHeader>

              <Search
                value={this.state.Search}
                onChange={this.onChange}
                after={null}
              />

              {this.state.Search !== "" && (
                <List>
                  {typeof this.groups !== "undefined" &&
                    this.groups.slice(0, 10).map((group) => (
                      <Cell
                        onClick={() =>
                          this.setState({
                            SelectedGR: group.value,
                            ID: group.oid,
                            ScheduleType: 0,
                            activePanel: "Schedule",
                          })
                        }
                        before={<Icon28UsersOutline />}
                        expandable
                        key={group.oid}>
                        {group.value}
                      </Cell>
                    ))}
                  {typeof this.preps !== "undefined" &&
                    this.preps.slice(0, 10).map((prep) => (
                      <Cell
                        onClick={() =>
                          this.setState({
                            SelectedGR: prep.value,
                            ID: prep.oid,
                            ScheduleType: 1,
                            activePanel: "Schedule",
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

          <Panel id="Schedule">
            <PanelHeader
              separator={false}
              left={
                <PanelHeaderBack
                  onClick={() => this.setState({ activePanel: "Search" })}
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

            <Schedule
              id={this.state.ID}
              type={this.state.ScheduleType}
              grname={this.state.SelectedGR}></Schedule>
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
            <Search value={this.state.Search} onChange={this.onChange} />
            {this.state.Search !== "" && (
              <List>
                {typeof this.groups !== "undefined" &&
                  this.groups.slice(0, 10).map((group) => (
                    <Cell
                      onClick={() =>
                        this.SaveDefaultSchedule({
                          id: group.oid,
                          name: group.value,
                          type: 0,
                        })
                      }
                      before={<Icon28UsersOutline />}
                      expandable
                      key={group.oid}>
                      {group.value}
                    </Cell>
                  ))}
                {typeof this.preps !== "undefined" &&
                  this.preps.slice(0, 10).map((prep) => (
                    <Cell
                      onClick={() =>
                        this.SaveDefaultSchedule({
                          id: prep.oid,
                          name: prep.value,
                          type: 1,
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
          </Panel>
        </View>
      </Epic>
    );
  }
}
export default MainFrame;
