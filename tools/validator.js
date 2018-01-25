export function validateMail (mail) {
    let pass = false;
    let mail_patt = /([^@]+)@([\w]+)[.](\w+)/g;
    if (mail === '') {
      this.setState({err_mail: error_messages.REQUIRE});
      pass = false;
    } else {
      let mail_match = mail.match(mail_patt);
      if (mail_match && mail === mail_match[0]) {
        pass = true;
      } else {
        pass = false;
      }
    }
    return pass;
  }