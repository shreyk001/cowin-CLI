# cowin-CLI
Application to get vaccination slots using command line interface using cowin api. 
## How to use
### Install dependencies
`$npm install`
### On terminal/windows powershell/any command line interface 
```
$cowin

Usage: index [options] [command]

Options:
  -h, --help          display help for command

Commands:
  states              List down all the states
  district <stateid>  List down all the districts for a state id
  slots <districtid>  List down all the slots for a given district id
  help [command]      display help for command
 ```
 ### Example 
 ```
 $ cowin slots 142
? Please choose age group 45+

  ┌────────────────────────────────────────┬────────────────────────────────────────┬──────────┬──────────┬────────────────────┐
  │              Center Name               │             Center Address             │ Avail... │ Min age  │        Date        │
  ├────────────────────────────────────────┼────────────────────────────────────────┼──────────┼──────────┼────────────────────┤
  │ New Delhi Medical Center PBClb         │ Punjabi Bagh Club Road No. 41 New D... │ 192      │ 45       │ 18-07-2021         │
  └────────────────────────────────────────┴────────────────────────────────────────┴──────────┴──────────┴────────────────────┘
 
 ```
 
