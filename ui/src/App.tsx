import { MantineProvider } from "@mantine/core";
import { Button } from "@mantine/core";
import React from "react";
import _ from "lodash";
import io from 'socket.io-client';

const socket = io('172.20.10.10:8080');

export default function App() {
	const [controller, setController] = React.useState([false, false, false, false]);
	const setKeys = (at: number, flag: boolean) => {
		setController(() => {
			const a = [false, false, false, false];
			a[at] = flag;
			return a;
		});
	};
	React.useEffect(() => {
		document.addEventListener("keydown", (event) => {
			if (event.code === "ArrowUp" || event.key === "w") {
				setKeys(1, true);
			}

			if (event.code === "ArrowDown" || event.key === "s") {
				setKeys(2, true);
			}

			if (event.code === "ArrowLeft" || event.key === "a") {
				setKeys(0, true);
			}

			if (event.code === "ArrowRight" || event.key === "d") {
				setKeys(3, true);
			}
		});
	}, []);
	React.useEffect(() => {
		document.addEventListener("keyup", (event) => {
			if (event.code === "ArrowUp" || event.key === "w") {
				setKeys(1, false);
			}

			if (event.code === "ArrowDown" || event.key === "s") {
				setKeys(2, false);
			}

			if (event.code === "ArrowLeft" || event.key === "a") {
				setKeys(0, false);
			}

			if (event.code === "ArrowRight" || event.key === "d") {
				setKeys(3, false);
			}
		});
	}, []);

  React.useEffect(()=>{
    if(controller[0]){
      socket.emit("reply", "Left");
    }
    if(controller[1]){
      socket.emit("reply", "Up");
    }
    if(controller[2]){
      socket.emit("reply", "Down");
    }
    if(controller[3]){
      socket.emit("reply", "Right");
    }
    if(!controller[0] && !controller[1] && !controller[2] && !controller[3]){
      setTimeout(()=>{
        socket.emit("reply", "Stop");
      }, 100)
    }
  },[controller])
	return (
		<MantineProvider withGlobalStyles withNormalizeCSS>
			<Button style={{ backgroundColor: controller[0] ? "red" : "" }} onMouseDown={()=>{
        setTimeout(()=>{
          setKeys(0,true);
        }, 5)
      }}>Left</Button>
			<Button style={{ backgroundColor: controller[1] ? "red" : "" }} onMouseDown={()=>{
        setTimeout(()=>{
          setKeys(0,true);
        }, 5)
      }}>Up</Button>
			<Button style={{ backgroundColor: controller[2] ? "red" : "" }} onMouseDown={()=>{
        setTimeout(()=>{
          setKeys(0,true);
        }, 5)
      }}>Down</Button>
			<Button style={{ backgroundColor: controller[3] ? "red" : "" }} onMouseDown={()=>{
        setTimeout(()=>{
          setKeys(0,true);
        }, 5)
      }}>Right</Button>
		</MantineProvider>
	);
}
