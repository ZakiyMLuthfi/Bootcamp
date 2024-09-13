const yargs = require ("yargs");

yargs.command({
    command: 'add',
    describe: 'add new contact',
    builder:{
        nama: {
            describe: 'Contact name',
            demandOption: true,
            type: 'string',
        },
        email: {
            describe: 'Contact Email',
            demandOption: false,
            type: 'string',
        },
        telp:{
            describe: 'Contact mobile',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv){
        const contact = {
            name: argv.nama,
            email: argv.email,
            mobile: argv.telp,
        };
        console.log(contact);
    },

});

yargs.parse();