var passwordLabel = document.querySelector(".password-label")
var passwordLabelCopy = passwordLabel.cloneNode(true)
passwordLabel.remove();
var passwordParent = document.querySelector(".entry-item:has(#password)")
passwordParent.append(passwordLabel)