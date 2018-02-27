export function getIcon (name) {
  switch (name) {
    case 'call_w': return require('./ic_call_white_24dp.png');
    case 'menu_w': return require('./ic_menu_white_24dp.png');
    case 'Dashboard': return require('./ic_dashboard_black_24dp.png');
    case 'Profile': return require('./ic_person_black_24dp.png');
    case 'Suggestion': return require('./ic_comment_black_24dp.png');
    case 'Setup Device': return require('./ic_settings_bluetooth_black_24dp.png');
    case 'Hospital Information': return require('./ic_local_hospital_black_24dp.png');
    case 'Setting': return require('./ic_settings_black_24dp.png');
    case 'Emergency Contact': return require('./ic_contacts_black_24dp.png');
    case 'Send Email': return require('./ic_email_black_24dp.png');
    case 'Export Backup File': return require('./ic_file_download_black_24dp.png');
    case 'add_b': return require('./ic_add_circle_outline_black_24dp.png');
    case 'back_w': return require('./ic_arrow_back_white_24dp.png');
    default : return require('./ic_insert_chart_black_24dp.png');
  }
}