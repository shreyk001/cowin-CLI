#! /usr/bin/env node
const states = require("../util/states");
const district = require("../util/district");
const slots = require("../util/slots");
const program = require("commander");

program
  .command("states")
  .description("List down all the states")
  .action(states);
program
  .command("district <stateid>")
  .description("List down all the districts for a state id")
  .action(district);
program
  .command("slots <districtid>")
  .description("List down all the slots for a given district id")
  .action(slots);

program.parse();