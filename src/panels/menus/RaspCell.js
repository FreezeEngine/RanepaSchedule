import React from "react";
import "@vkontakte/vkui/dist/vkui.css";
import "@vkontakte/vkui/";
import { Separator } from "@vkontakte/vkui";
import "./tables.css";
//import { Headline } from "@vkontakte/vkui/src/components/Typography/Headline/Headline"
//import Headline from "@vkontakte/vkui/src/components/Typography/Headline/Headline";

const ScheduleCell = (ts, te, audit, prep, subj, type) => {
  return (
    <div>
      <table class="ScheduleTable">
        <tbody>
          <tr>
            <td class="ScheduleTime">
              {ts}
              <br />
              {te}
            </td>
            <td class="ScheduleLesson">
              {subj} ({type})
            </td>
            <td class="ScheduleAudit">
              {audit}
              <br />
            </td>
            <td class="SchedulePrep">{prep}</td>
          </tr>
        </tbody>
      </table>
      <Separator/>
    </div>
  );
};

export default ScheduleCell;
