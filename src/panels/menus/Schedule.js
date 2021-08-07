import React from "react";
import "@vkontakte/vkui/dist/vkui.css";
import "@vkontakte/vkui/";
import Icon56UsersOutline from "@vkontakte/icons/dist/56/users_outline";
import {
  Separator,
  Spinner,
  Button,
  Placeholder,
  Header,
} from "@vkontakte/vkui";
import "./MainStyle.css";
var Schedule = [];
var Url;

class ScheduleDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      error: "",
    };
  }
  async componentDidMount() {
    this.setState({
      isLoaded: false,
    });
    var days = 14;
    if (
      (this.props.id === "") |
      (this.props.type === "3") |
      (typeof this.props.type === "undefined")
    ) {
      Schedule = "nan";
      this.setState({
        isLoaded: true,
      });
      return Schedule;
    } else {
      try {
        Url = "https://raneparedirector.azurewebsites.net/GetSchedule.php";
        await fetch(Url, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-Urlencoded",
          },
          body:
            "id=" +
            this.props.id +
            "&days=" +
            days +
            "&type=" +
            this.props.type,
        })
          .then((res) => res.json())
          .then((result) => {
            switch (result.length !== 0) {
              case true:
                Schedule = result;
                this.setState({
                  isLoaded: true,
                });
                return Schedule;
              default:
                Schedule = [];
                this.setState({
                  isLoaded: true,
                });
                return Schedule;
            }
          });
      } catch (error) {
        this.setState({ error: error });
      }
    }
  }
  render() {
    if ((this.state.isLoaded === true) & (Schedule.length !== 0)) {
      if ((this.props.type === "0") | (this.props.type === 0)) {
        return (
          <div key={Math.random(1)}>
            {Schedule.map((block) => (
              <div key={Math.random(10)}>
                <Header mode="secondary">{block[0]}</Header>
                <Separator wide={true} />
                <div key={Math.random(10)}>
                  {block[1].map((CellData) => (
                    <div key={Math.random()}>
                      <table className="ScheduleTable" key={Math.random(10)}>
                        <tbody>
                          <tr>
                            <td className="ScheduleTime" key={Math.random()}>
                              {CellData.nf}
                              <br />
                              {CellData.kf}
                            </td>
                            <td className="ScheduleLesson" key={Math.random()}>
                              {CellData.subject}
                              <br></br>
                              {CellData.type.split(", ")[1] !==
                                this.props.grname &&
                                " (" + CellData.type.split(", ")[1] + ")"}
                            </td>
                            <td className="ScheduleAudit" key={Math.random()}>
                              {" " + CellData.type.split(", ")[0] + "."}
                              <br></br>
                              {CellData.number}
                            </td>
                            <td className="SchedulePrep" key={Math.random()}>
                              {CellData.teacher.split(" ")[0]}
                              <br></br>
                              {CellData.teacher.split(" ")[1]}
                              {CellData.teacher.split(" ")[2]}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <Separator wide={true}></Separator>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      } else if ((this.props.type === "1") | (this.props.type === 1)) {
        return (
          <div key={Math.random(1)}>
            {Schedule.map((block) => (
              <div key={Math.random(10)}>
                <Header mode="secondary">{block[0]}</Header>
                <Separator wide={true} />
                <div key={Math.random(10)}>
                  {block[1].map((CellData) => (
                    <div key={Math.random()}>
                      <table className="ScheduleTable" key={Math.random(10)}>
                        <tbody>
                          <tr>
                            <td className="ScheduleTimeP" key={Math.random()}>
                              {CellData.nf}
                              <br />
                              {CellData.kf}
                            </td>
                            <td className="ScheduleLessonP" key={Math.random()}>
                              {CellData.subject}
                            </td>
                            <td className="ScheduleAuditP" key={Math.random()}>
                              {CellData.number}, {CellData.type}.{" "}
                              {CellData.group}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <Separator wide={true}></Separator>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      } else {
        return (
          <Placeholder
            icon={<Icon56UsersOutline />}
            header="Группа не выбрана"
            action={
              <Button
                size="l"
                onClick={() => {
                  this.props.SearchPop();
                }}
                style={{ backgroundColor: "var(--main)" }}
                key={Math.random()}>
                Выбрать
              </Button>
            }>
            Расписание не доступно
          </Placeholder>
        );
      }
    } else if (this.state.error !== "") {
      return (
        <Placeholder icon={<Icon56UsersOutline />} header="Ошибка">
          <p>Не удалось загрузить расписание</p>
        </Placeholder>
      );
    } else if ((Schedule.length === 0) & (this.state.isLoaded === true)) {
      return (
        <Placeholder icon={<Icon56UsersOutline />} header="Нет данных">
          Расписание не доступно
        </Placeholder>
      );
    } else {
      return <Spinner size="medium"/>;
    }
  }
}

export default ScheduleDrawer;
