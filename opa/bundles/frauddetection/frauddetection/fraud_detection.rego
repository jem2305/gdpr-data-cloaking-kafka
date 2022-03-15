package frauddetection

default input_is_cloaked = false
default arrangement_in_allowed_list = false

input_is_cloaked {
    not arrangement_in_allowed_list
}

arrangement_in_allowed_list {
    data.cloaking.allowedArrangements[_] == input.transactionReference.arrangementId
}