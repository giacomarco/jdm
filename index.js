import { Jdm } from "./src/jdm.js";
import { _core } from "./src/_core.js";
import { _evt } from "./src/_evt.js";
import { _common } from "./src/_common.js";
import { _animation, AnimationOption, keyframe } from "./src/_animation.js";
import { Proto } from "./src/proto.js";

const JDM = (element = null, parent = null, classList = null, deep = true, ...args) => new Jdm(element, parent, classList, deep, ...args);

export { Jdm, JDM, _core, _evt, _common, _animation, AnimationOption, keyframe, Proto };
export default Jdm;
