import { CatPotential, VerletMaruyama } from "./physics.js";
import { x2c, y2c, parse_x, parse_vx, parse_dt, NumberLine, CoordinateSystem } from "./utilities.js"
import { DrawImage } from "./geometry.js";


// building canvas
export const canvas = document.getElementById("CatCanvas");
export const ctx = canvas.getContext("2d");

// global definitions
export const manim_red = "#FC6255";
export const manim_blue = "#58C4DD";



// ++++++++++ PARAMETER SECTION ++++++++++

// parameters of the potential
let g_coupling = 1;                                 // coupling constant between cat and human
let delta_bonding = 0.5;                            // specific bonding strength between cat and humam



// ++++++++++ MAIN SECTION ++++++++++

// building coordinate system and potential
let axis = new CoordinateSystem(ctx, [0, -0], [-6, 6], [-3.5, +3.5], [-1.3, 1.3], [-0.2, 0.2], "x", "V(x)");
let potential = new CatPotential(g_coupling, delta_bonding);
let potential_function = axis.draw_function(ctx, potential.get_potential);

// saving canvas background for save and reset
let save_image = new Image();
save_image.src = canvas.toDataURL("images/save_background.jpg");
let reset_image = new Image();
reset_image.src = canvas.toDataURL("images/reset_background.jpg");


// ++++++++++ EVENT FUNCTIONS ++++++++++


// updates the drawn cat potential
function update_potential() {
    g_coupling = parseFloat(document.getElementById("coupling_constant").value);
    delta_bonding = parseFloat(document.getElementById("bond_strength").value);
    console.log(delta_bonding)
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // build new potential
    axis = new CoordinateSystem(ctx, [0, -0], [-6, 6], [-3.5, +3.5], [-1.3, 1.3], [-0.2, 0.2], "x", "V(x)");
    potential = new CatPotential(g_coupling, delta_bonding);
    potential_function = axis.draw_function(ctx, potential.get_potential); 

    // saving the canvas background for new frame and reset
    save_image = new Image();
    save_image.src = canvas.toDataURL("images/save_background.jpg");
    reset_image = new Image();
    reset_image.src = canvas.toDataURL("images/reset_background.jpg");

    // setting up integrator and place cat
    new DrawImage(ctx, cat_image, axis, nline, potential.get_potential, x);
}



// ++++++++++ EVENT LISTENERS ++++++++++


// track interactions with the navigation bar
document.getElementById("coupling_constant").addEventListener("change", update_potential);
document.getElementById("bond_strength").addEventListener("change", update_potential);