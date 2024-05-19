import React, { useState, useEffect } from "react";
import Mode from "./Mode";
import CustomConfig from "./CustomConfig";
import Settings from "./Settings";
import CustomIcon from "./icons/CustomIcon";
import PracticeIcon from "./icons/PracticeIcon";
import SettingsIcon from "./icons/MiscIcon";
import { settingsProps } from "./interface";

function Menu() {
  const [menu, setMenu] = useState(true);

  const [plus, setPlus] = useState(false);
  const [minus, setMinus] = useState(false);
  const [multi, setMulti] = useState(false);
  const [divide, setDivide] = useState(false);
  const [custom, setCustom] = useState(false);
  const [practice, setPractice] = useState(false);
  const [settings, setSettings] = useState(false);
  const [selected, setSelected] = useState("");

  const modes = [plus, minus, multi, divide, practice, custom, settings];
  const setModes = [
    setPlus,
    setMinus,
    setMulti,
    setDivide,
    setPractice,
    setCustom,
    setSettings,
  ];
  const modesText: string[] = [
    "Addition",
    "Subtraction",
    "Multiplication",
    "Division",
    "Practice",
    "Custom",
    "Settings",
  ];

  const handleMode = (number: number) => {
    setFalse();
    setModes[number](!modes[number]);
    setSelected(modesText[number]);
    if (selected === modesText[number]) {
      setSelected("");
    }
  };

  const handleSettings = () => {
    setSettings(!settings);
    if (settings) {
      setSelected("");
    } else {
      setSelected("Settings");
    }
  };

  const setFalse = () => {
    setModes.forEach((e) => e(false));
  };

  const hideMenu = () => {
    setMenu(!menu);
  };

  const width = window.screen.width;
  useEffect(() => {
    const width = window.screen.width;
  }, [window.screen.width]);

  window.addEventListener("orientationchange", function () {
    window.location.reload();
  });

  useEffect(() => {
    if (!localStorage.getItem("keypadState")) {
      localStorage.setItem("keypadState", "true");
      localStorage.setItem("keypadType", "default");
    } else {
    }
  }, []);

  return (
    <>
      {width > 615 ? (
        <div
          className={
            menu
              ? "absolute left-0 top-0 bg-teal-900 p-2 h-full w-52 overflow-auto"
              : "hidden"
          }
        >
          <div className="text-xl font-black p-2">
            MathTrainer
            <sup className="text-base font-black p-2">v0.1</sup>
          </div>
          <div
            className={
              plus ? "menu-options bg-teal-700 translate-x-2" : "menu-options"
            }
            onClick={() => handleMode(0)}
          >
            <div className="menu-icons">+</div>
            <div className="menu-text">Addition</div>
          </div>
          <div
            className={
              minus ? "menu-options bg-teal-700 translate-x-2" : "menu-options"
            }
            onClick={() => handleMode(1)}
          >
            <div className="menu-icons">-</div>
            <div className="menu-text">Subtraction</div>
          </div>
          <div
            className={
              multi ? "menu-options bg-teal-700 translate-x-2" : "menu-options"
            }
            onClick={() => handleMode(2)}
          >
            <div className="menu-icons">×</div>
            <div className="menu-text">Multiplication</div>
          </div>
          <div
            className={
              divide ? "menu-options bg-teal-700 translate-x-2" : "menu-options"
            }
            onClick={() => handleMode(3)}
          >
            <div className="menu-icons">÷</div>
            <div className="menu-text">Division</div>
          </div>
          <div
            className={
              practice
                ? "menu-options bg-teal-700 translate-x-2 mt-8"
                : "menu-options mt-8"
            }
            onClick={() => handleMode(4)}
          >
            <div className="menu-icons">
              <PracticeIcon />
            </div>
            <div className="menu-text">Practice</div>
          </div>
          <div
            className={
              custom ? "menu-options bg-teal-700 translate-x-2" : "menu-options"
            }
            onClick={() => handleMode(5)}
          >
            <div className="menu-icons">
              <CustomIcon />
            </div>
            <div className="menu-text">Custom</div>
          </div>
          <div
            className={
              settings
                ? "menu-options bg-teal-700 translate-x-2 mt-8"
                : "menu-options mt-8"
            }
            onClick={() => handleMode(6)}
          >
            <div className="menu-icons">
              <SettingsIcon />
            </div>
            <div className="menu-text">Misc</div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col h-screen w-full">
          <div className="text-3xl font-black p-2">
            MathTrainer
            <sup className="text-base font-black p-2">v0.1</sup>
          </div>
          <div className="text-xl pt-10">Please rotate your device</div>
        </div>
      )}

      {selected === "Custom" ? (
        <CustomConfig />
      ) : selected === "Practice" ? (
        <CustomConfig />
      ) : selected === "Settings" ? (
        <Settings selected={settings} />
      ) : (
        <Mode selected={selected} hideMenu={hideMenu} />
      )}
    </>
  );
}

export default Menu;
