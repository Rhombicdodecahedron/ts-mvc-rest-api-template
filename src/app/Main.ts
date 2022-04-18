import Ctrl from "../ctrl/Ctrl";
import Wrk from "../model/Wrk";

/**
 * Main class of the Template REST API.
 *
 * @class Main
 * @author Alexis Stella
 * @version 1.0.0
 * @since 17.04.2022
 */
class Main {
    /**
     * Method called when the bot is started.
     *
     * @static
     * @memberof Main
     * @method main
     * @returns {void}
     */
    public static main(): void {
        let ctrl = new Ctrl();
        let wrk = new Wrk();
        ctrl.setWrk(wrk);
        wrk.setCtrl(ctrl);
        ctrl.start();
    }
}

export default Main;