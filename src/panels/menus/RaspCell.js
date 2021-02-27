import React from "react";
import "@vkontakte/vkui/dist/vkui.css";
import "@vkontakte/vkui/";
import { Separator } from "@vkontakte/vkui";
import "./tables.css";
//import { Headline } from "@vkontakte/vkui/src/components/Typography/Headline/Headline"
//import Headline from "@vkontakte/vkui/src/components/Typography/Headline/Headline";

const ScheduleCell = (data) => {
  return (
    <div>
      <table class="ScheduleTable">
        <tbody>
          <tr>
            <td class="ScheduleTime">
              {data.ts}
              <br />
              {data.te}
            </td>
            <td class="ScheduleLesson">
              {data.subj} ({data.type})
            </td>
            <td class="ScheduleAudit">
              {data.audit}
              <br />
            </td>
            <td class="SchedulePrep">{data.prep}</td>
          </tr>
        </tbody>
      </table>
      <Separator/>
    </div>
  );
};

export default ScheduleCell;
