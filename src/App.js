//import React, { useState, useEffect } from 'react';
import React from "react";
//import bridge from '@vkontakte/vk-bridge';
//import '@vkontakte/vkui/dist/vkui.css';
import "@vkontakte/vkui/";

import Tabs from "./panels/tabs";

/*const ROUTES = {
	INTRO: 'intro',
}*/

//const Storage_keys ={
//	intro_status: 'status',
//}

const App = () => {
  //const [activePanel, setActivePanel] = useState(ROUTES.HOME);
  /*useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
	}, []);*/

  return <Tabs className="Tabs" />;
};

export default App;
