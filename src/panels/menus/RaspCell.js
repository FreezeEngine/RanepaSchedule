import React from 'react';
import '@vkontakte/vkui/dist/vkui.css';
import '@vkontakte/vkui/';
import { Separator } from "@vkontakte/vkui";
import './tables.css';
//import { Headline } from "@vkontakte/vkui/src/components/Typography/Headline/Headline"
//import Headline from "@vkontakte/vkui/src/components/Typography/Headline/Headline";



const RaspCell = (ts,te,audit,prep,subj,type) => {
    return (
      <div>
            <table class="RaspTable">
              <tbody>
                <tr>
                <td class="RaspTime">{ts}<br/>{te}</td>
                <td class="RaspLesson">{subj} ({type})</td>
                <td class="RaspAudit">{audit}<br/></td>
                <td class="RaspPrep">{prep}</td>
                </tr>
            </tbody>
            
            </table>
            <Separator></Separator>
            </div>
	);
}

export default RaspCell;