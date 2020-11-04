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
import "./main_style.css";
var rasp = [];
var url;

class Rasp extends React.Component {
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
      rasp = "nan";
      this.setState({
        isLoaded: true,
      });
      return rasp;
    } else {
      try {
        url = "https://ranepaschedule.000webhostapp.com/GetRasp.php";
        await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
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
                rasp = result;
                this.setState({
                  isLoaded: true,
                });
                return rasp;
              default:
                rasp = [];
                this.setState({
                  isLoaded: true,
                });

                return rasp;
            }
          });
      } catch (error) {
        this.setState({ error: error });
      }
    }
  }
  render() {
    if ((this.state.isLoaded === true) & (rasp.length !== 0)) {
      if ((this.props.type === "0") | (this.props.type === 0)) {
        return (
          <div key={Math.random(1)}>
            {rasp.map((block) => (
              <div key={Math.random(10)}>
                <Header mode="secondary">{block[0]}</Header>
                <Separator wide={true} />
                <div key={Math.random(10)}>
                  {block[1].map((celldata) => (
                    <div key={Math.random()}>
                      <table className="RaspTable" key={Math.random(10)}>
                        <tbody>
                          <tr>
                            <td className="RaspTime" key={Math.random()}>
                              {celldata.nf}
                              <br />
                              {celldata.kf}
                            </td>
                            <td className="RaspLesson" key={Math.random()}>
                              {celldata.subject}
                              <br></br>
                              {celldata.type.split(", ")[1] !==
                                this.props.grname &&
                                " (" + celldata.type.split(", ")[1] + ")"}
                            </td>
                            <td className="RaspAudit" key={Math.random()}>
                              {" " + celldata.type.split(", ")[0] + "."}
                              <br></br>
                              {celldata.number}
                            </td>
                            <td className="RaspPrep" key={Math.random()}>
                              {celldata.teacher.split(" ")[0]}
                              <br></br>
                              {celldata.teacher.split(" ")[1]}
                              {celldata.teacher.split(" ")[2]}
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
            {rasp.map((block) => (
              <div key={Math.random(10)}>
                <Header mode="secondary">{block[0]}</Header>
                <Separator wide={true} />
                <div key={Math.random(10)}>
                  {block[1].map((celldata) => (
                    <div key={Math.random()}>
                      <table className="RaspTable" key={Math.random(10)}>
                        <tbody>
                          <tr>
                            <td className="RaspTimeP" key={Math.random()}>
                              {celldata.nf}
                              <br />
                              {celldata.kf}
                            </td>
                            <td className="RaspLessonP" key={Math.random()}>
                              {celldata.subject}
                            </td>
                            <td className="RaspAuditP" key={Math.random()}>
                              {celldata.number}, {celldata.type}.{" "}
                              {celldata.group}
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
          Не удалось загрузить расписание
        </Placeholder>
      );
    } else if ((rasp.length === 0) & (this.state.isLoaded === true)) {
      return (
        <Placeholder icon={<Icon56UsersOutline />} header="Нет данных">
          Расписание не доступно
        </Placeholder>
      );
    } /*else if (this.props.id === ""|this.props.id === "3"|this.rasp === "nan") {
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
    }*/ else {
      return <Spinner size="medium" style={{ marginTop: 20 }} />;
    }
  }
}

export default Rasp;
