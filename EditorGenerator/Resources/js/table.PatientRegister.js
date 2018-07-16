(function($){

    $(document).ready(function() {
        var editor = new $.fn.dataTable.Editor( {
            ajax: '/api/PatientRegister',
            table: '#PatientRegister',
            fields: [
            //	{
            //		"label": "Token No:",
            //		"name": "token_no"
            //	},

                {
                    "label": "OHIP:",
                    "name": "ohip"
                },
                {
                    "label": "Name:",
                    "name": "name"
                },
                {
                    "label": "Birth Date:",
                    "name": "birth_date",
                    "type": "datetime",
                    "format": "YYYY-MM-DD"
                },
                {
                    "label": "Expiry Date:",
                    "name": "expiry_date",
                    "type": "datetime",
                    "format": "YYYY-MM-DD"
                },
                {
                    "label": "Version Code:",
                    "name": "version_code"
                },
                {
                    "label": "Service Time:",
                    "name": "service_time",
                    "type": "datetime",
                    "format": "HH:mm:ss"
                },
                {
                    "label": "Show details",
                    "name": "options",
                    "type": "select",
                    "options": ["Simple", "All"],
                    "def": "Simple"
                },
                {
                    "label": "Scan Time:",
                    "name": "scan_time",
                    "type": "datetime",
                    "format": "HH:mm:ss",
                    "def": function () { return new Date(); },
                 // "attr": { readonly: true }
                },
                {
                    "label": "Wait Time:",
                    "name": "wait_time",
                    "type": "datetime",
                    "format": "HH:mm:ss",
                //  "attr": { readonly: true }
                }, 
                {
                    "label": "Comment:",
                    "name": "comment",
                    "type": "text"
                },
                {
                    "label": "Location:",
                    "name": "location"
                },
                {
                    "label": "Date:",
                    "name": "date",
                    "type": "datetime",
                    "format": "YYYY-MM-DD",
                    "def": function () { return new Date(); },
                //  "attr": { readonly: true }
                },
            ]
        });

        editor.dependent('options', function (val) {
            return val == 'Simple' ?
            { hide: ['scan_time', 'location', 'date', 'wait_time'] } :
            { show: ['scan_time', 'location', 'date', 'wait_time'] };
        });

        $('#PatientRegister').on('click', 'tbody td.editable', function (e) {
            editor.bubble(this);
        });

        var table = $('#PatientRegister').DataTable( {

            scrollY: '62vh',
            scrollCollapse: true,
            paging: false,

            ajax: '/api/PatientRegister',
            columns: [
                {
                    "data": "token_no"
                },
                {
                    "data": "ohip"
                },
                {
                    "data": "name"
                },
                {
                    "data": "birth_date"
                },
                {
                    "data": "expiry_date"
                },
                {
                    "data": "version_code"
                },
                {
                    "data": "scan_time"
                },
                {
                    "data": "service_time"
                },
                {
                    "data": "wait_time"
                },
                {
                    "data": "location"
                },
                {
                    "data": "date"
                },
                {
                    "data": "comment", className: 'editable'
                }
            ],
            select: true,
            lengthChange: false,
            "order": [[0, "desc"]],

          /*  "columnDefs": [
                {
                    "targets": [3, 4, 5, 8, 9, 10],         // All Columns visible
                    "visible": false,
                }
            ],
            */
        } );

    new $.fn.dataTable.Buttons( table, [
		{ extend: "create", editor: editor },
		{ extend: "edit",   editor: editor },
        { extend: "remove", editor: editor },

        {   extend: 'collection',
            text: 'Export',
            buttons: [
                'copy',
                'excel',
                'csv',
                'pdf',
                'print'
            ]
        },

        {
            extend: "selectedSingle",
            text: "Add Service Time",
            action: function (e, dt, node, config) {
                // Immediately add current time
                editor
                    .edit(table.row({ selected: true }).index(), false)
                    .set('service_time', new Date())
                    .submit();
            }
        },
    ]);

   // editor.field('scan_time').disable();
   // editor.field('location').disable();
   // editor.field('date').disable();
    editor.field('wait_time').disable();

    setInterval(function () {
        table.ajax.reload();
    }, 10000);

    table.buttons().container()
		.appendTo( $('.small-6.columns:eq(0)', table.table().container() ) );
});

}(jQuery));