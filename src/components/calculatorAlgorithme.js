function print(a) {
    console.log(a);
}
// ================================================
   function my_find(table, relation) {
    return table.find(elm => elm.relation == relation);
}

function sum(inheritance_result_table) {
    let res = 0;
    for(let i = 0; i < inheritance_result_table.length; i++) {
        res += inheritance_result_table[i].share;
    }

    return res;
}

// returns the index of the mo3asib, and -1 if there is no mo3asib
function there_is_mo3asib(inheritance_result_table) {
    let i = 0;
    for(i = 0; i < inheritance_result_table.length; i++) {
        if(inheritance_result_table[i].mo3asib == true)
            break;
    }
    if(inheritance_result_table.length == 0)
        return -1;
    if(i >= inheritance_result_table.length)
        return -1;
    return i;
}

// مسالة ردية (يعني لا يوجد معصب والقسمة اقل من 1) انزع الزوجين ورد الباقي للاخرين
function give_back_the_rest(inheritance_result_table) {
    let the_rest = 1 - sum(inheritance_result_table);
    // sum without the spouses
    let partial_sum  = 0;
    for(let i = 0; i < inheritance_result_table.length; i++) {
        let relation = inheritance_result_table[i].relation;
        if(relation != "wife" && relation != "husband") {
            partial_sum += inheritance_result_table[i].share;
        }
    }

    for(let i = 0; i < inheritance_result_table.length; i++) {
        let relation = inheritance_result_table[i].relation;
        if(relation != "wife" && relation != "husband") {
            inheritance_result_table[i].share += the_rest * inheritance_result_table[i].share * (1/partial_sum);
        }
    }
}

function first_diagram(table, inheritance_result_table) {
    let husband = my_find(table, "husband");
    let wife = my_find(table, "wife");

    if (husband.number == 0) {
        inheritance_result_table.push({
            relation : "wife",
            share : 1/4,
            reason : "fardan",
            info : [
                "if more then one, equal division",
                "rest for relatives (dawi arham)"
            ]
        });
    } else {
        inheritance_result_table.push({
            relation : "husband",
            share : 1/2,
            reason : "fardan",
            info : [
                "rest for relatives (dawi arham)"
            ]
        })
    }
}


function second_diagram(table, inheritance_result_table) {
    let husband = my_find(table, "husband");
    let wife = my_find(table, "wife");

    if (husband.number == 0) {
        inheritance_result_table.push({
            relation : "wife",
            share : 1/4,
            reason : "fardan",
            info : [
                "if more then one, equal division",
            ]
        });
        inheritance_result_table.push({
            relation : "mother",
            share : 1/4,
            reason : "fardan",
            info : [
                "quarter of the rest which is 1/4",
            ]
        });
        inheritance_result_table.push({
            relation : "father",
            share : 1/2,
            reason : "ta3siban",
            info : [
                "the rest which is 1/2",
            ]
        })
    } else {
        inheritance_result_table.push({
            relation : "husband",
            share : 1/2,
            reason : "fardan",
            info : [
            ]
        });
        inheritance_result_table.push({
            relation : "mother",
            share : Math.round((1/6)*10000)/10000,
            reason : "fardan",
            info : [
                "third of the rest which is 1/6"
            ]
        });
        inheritance_result_table.push({
            relation : "father",
            share : Math.round((1/3)*10000)/10000,
            reason : "ta3siban",
            info : [
                "the rest which is 1/3"
            ]
        })
    }
}

function third_diagram(table, inheritance_result_table) {
    if(my_find(table, "father").number == 1) {
        inheritance_result_table.push({
            relation : "father",
            share : 1/6,
            reason : "fardan",
            info : [
                "if the shares are more then 1, Decreased from his share according to his original share"
            ]
        })
    } else if(my_find(table, "paternal grandfather").number == 1) {
        inheritance_result_table.push({
            relation : "paternal grandfather",
            share : 1/6,
            reason : "fardan",
            info : [
                "if the shares are more then 1, Decreased from his share according to his original share"
            ]
        })
    }


    if(my_find(table, "mother").number == 1) {
        inheritance_result_table.push({
            relation : "mother",
            share : 1/6,
            reason : "fardan",
            info : [
                "if the shares are more then 1, Decreased from her share according to her original share"
            ]
        })
    } else if(my_find(table, "maternal grandmother").number == 1) {
        if(my_find(table, "paternal grandmother").number == 1) {
            inheritance_result_table.push({
                relation : "maternal grandmother",
                share : 1/12,
                reason : "fardan",
                info : [
                    "if the shares are more then 1, Decreased from her share according to her original share",
                    "divide the 1/6 between paternal grandmother and maternal grandmother"
                ]
            })
            inheritance_result_table.push({
                relation : "paternal grandmother",
                share : 1/12,
                reason : "fardan",
                info : [
                    "if the shares are more then 1, Decreased from her share according to her original share",
                    "divide the 1/6 between paternal grandmother and maternal grandmother"
                ]
            })
        } else {
            inheritance_result_table.push({
                relation : "maternal grandmother",
                share : 1/6,
                reason : "fardan",
                info : [
                    "if the shares are more then 1, Decreased from her share according to her original share"
                ]
            })
        }
    } else if(my_find(table, "paternal grandmother").number == 1) {
        inheritance_result_table.push({
            relation : "paternal grandmother",
            share : 1/6,
            reason : "fardan",
            info : [
                "if the shares are more then 1, Decreased from her share according to her original share"
            ]
        })
    }


    if(my_find(table, "husband").number == 1) {
        inheritance_result_table.push({
            relation : "husband",
            share : 1/4,
            reason : "fardan",
            info : [
                "if the shares are more then 1, Decreased from his share according to his original share"
            ]
        })
    } else if(my_find(table, "wife").number > 0) {
        inheritance_result_table.push({
            relation : "wife",
            share : 1/8,
            reason : "fardan",
            info : [
                "if the shares are more then 1, Decreased from there shares according to there original shares"
            ]
        })
    }


    if(my_find(table, "son").number > 0) {
        if(my_find(table, "daughter").number > 0) {
            const sons = my_find(table, "son").number;
            const daughters = my_find(table, "daughter").number;
            const sum_of_shares = sum(inheritance_result_table);
            if(sum_of_shares <= 1) {
                const the_rest = 1 - sum_of_shares;
                const share_of_one_daughter = the_rest / (daughters+(sons*2))
                const share_of_all_daughters = share_of_one_daughter*daughters;
                const share_of_all_sons = share_of_one_daughter*sons*2;
                inheritance_result_table.push({
                    relation : "son",
                    share : share_of_all_sons,
                    reason : "ta3siban",
                    info : [
                        "For the male is like the share of two females"
                    ]
                });
                inheritance_result_table.push({
                    relation : "daughter",
                    share : share_of_all_daughters,
                    reason : "ta3siban",
                    info : [
                        "For the male is like the share of two females"
                    ]
                });
            }
        } else {
            const sum_of_shares = sum(inheritance_result_table);
            if(sum_of_shares <= 1) {
                const the_rest = 1 - sum_of_shares;
                inheritance_result_table.push({
                    relation : "son",
                    share : the_rest,
                    reason : "ta3siban",
                    info : [
                    ]
                });
            }
        }
    } else { 
        if(my_find(table, "daughter").number > 0) {
            if(my_find(table, "daughter").number == 1) {
                inheritance_result_table.push({
                    relation : "daughter",
                    share : 1/2,
                    reason : "fardan",
                    info : [
                        "if the shares are more then 1, Decreased from her share according to her original share"
                    ]
                });
            } else {
                inheritance_result_table.push({
                    relation : "daughter",
                    share : 2/3,
                    reason : "fardan",
                    info : [
                        "if the shares are more then 1, Decreased from her share according to her original share"
                    ]
                });
            }
        }
    // WE ARE SURE THERE IS SON'S SON
            if(my_find(table, "son's daughter").number > 0) {
            const son_sons = my_find(table, "son's son").number;
            const son_daughters = my_find(table, "son's daughter").number;
            const sum_of_shares = sum(inheritance_result_table);
            if (sum_of_shares <= 1) {
                const the_rest = 1 - sum_of_shares;
                const share_of_one_son_daughter = the_rest / (son_daughters+(son_sons*2));
                const share_of_all_son_daughers = share_of_one_son_daughter * son_daughters;
                const share_of_all_son_sons = share_of_one_son_daughter * son_sons * 2;
                inheritance_result_table.push({
                    relation : "son's son",
                    share : share_of_all_son_sons,
                    reason : "ta3siban",
                    info : [
                        "if the shares are more then 1, nothing is left for them"
                    ]
                });
                inheritance_result_table.push({
                    relation : "son's daughter",
                    share : share_of_all_son_daughers,
                    reason : "ta3siban",
                    info : [
                        "if the shares are more then 1, nothing is left for them"
                    ]
                });
            }
            } else {
                const sum_of_shares = sum(inheritance_result_table);
                if(sum_of_shares <= 1) {
                    const the_rest = 1 - sum_of_shares;
                    inheritance_result_table.push({
                        relation : "son's son",
                        share : the_rest,
                        reason : "ta3siban",
                        info : [
                            "if the shares are more then 1, nothing is left for them"
                        ]
                    });
                }
            }
    }

    const sum_of_all_shares = sum(inheritance_result_table); 
    // اذا المسالة عالت
    if (sum_of_all_shares >= 1) {
        for(let i = 0; i < inheritance_result_table.length; i++) {
            inheritance_result_table[i].share = inheritance_result_table[i].share * (1/sum_of_all_shares);
        }
    }

    
}




function fourth_diagram(table, inheritance_result_table) {
    const father = my_find(table, "father").number;
    const paternal_grandfather = my_find(table, "paternal grandfather").number;
    const mother = my_find(table, "mother").number;
    const maternal_grandmother = my_find(table, "maternal grandmother").number;
    const paternal_grandmother = my_find(table, "paternal grandmother").number;
    const husband = my_find(table, "husband").number;
    const wife = my_find(table, "wife").number;
    const daughter = my_find(table, "daughter").number;
    const son_daughter = my_find(table, "son's daughter").number;

    if(father == 1) {
        inheritance_result_table.push({
            relation : "father",
            share : 1/6,
            reason : "fardan",
            mo3asib : true,
            info : [
                "if the shares are more then 1, Decreased from his share according to his original share"
            ]
        });
    } else if(paternal_grandfather == 1) {
        inheritance_result_table.push({
            relation : "paternal grandfather",
            share : 1/6,
            reason : "fardan",
            mo3asib : true,
            info : [
                "if the shares are more then 1, Decreased from his share according to his original share"
            ]
        });
    }



    if(mother == 1) {
        inheritance_result_table.push({
            relation : "mother",
            share : 1/6,
            reason : "fardan",
            mo3asib : false,
            info : [
                "if the shares are more then 1, Decreased from his share according to his original share",
                "If there is anything left of the estate, it will be returned to her according to her share"
            ]
        });
    } else if(maternal_grandmother == 1) {
        if(paternal_grandmother == 1) {
            inheritance_result_table.push({
                relation : "maternal grandmother",
                share : 1/12,
                reason : "fardan",
                mo3asib : false,
                info : [
                    "if the shares are more then 1, Decreased from his share according to his original share",
                    "If there is anything left of the estate, it will be returned to her according to her share"
                ]
            });
            inheritance_result_table.push({
                relation : "paternal grandmother",
                share : 1/12,
                reason : "fardan",
                mo3asib : false,
                info : [
                    "if the shares are more then 1, Decreased from his share according to his original share",
                    "If there is anything left of the estate, it will be returned to her according to her share"
                ]
            });
        } else {
            inheritance_result_table.push({
                relation : "maternal grandmother",
                share : 1/6,
                reason : "fardan",
                mo3asib : false,
                info : [
                    "if the shares are more then 1, Decreased from his share according to his original share",
                    "If there is anything left of the estate, it will be returned to her according to her share"
                ]
            });
        }
    } else if(paternal_grandmother == 1) {
        inheritance_result_table.push({
            relation : "paternal grandmother",
            share : 1/6,
            reason : "fardan",
            mo3asib : false,
            info : [
                "if the shares are more then 1, Decreased from his share according to his original share",
                "If there is anything left of the estate, it will be returned to her according to her share"
            ]
        });
    }



    if(husband == 1) {
        inheritance_result_table.push({
            relation : "husband",
            share : 1/4,
            reason : "fardan",
            mo3asib : false,
            info : [
                "if the shares are more then 1, Decreased from his share according to his original share",
                "If there is anything left of the estate, it will not be returned to him according to his share"
            ]
        });
    } else if(wife > 0) {
        inheritance_result_table.push({
            relation : "wife",
            share : 1/8,
            reason : "fardan",
            mo3asib : false,
            info : [
                "if the shares are more then 1, Decreased from his share according to his original share",
                "If there is anything left of the estate, it will not be returned to her according to her share"
            ]
        });
    }



    if(daughter > 0) {
        if(daughter == 1) {
            inheritance_result_table.push({
                relation : "daughter",
                share : 1/2,
                reason : "fardan",
                mo3asib : false,
                info : [
                    "if the shares are more then 1, Decreased from his share according to his original share",
                    "If there is anything left of the estate, it will be returned to her according to her share"
                ]
            });
            if(son_daughter > 0) {
                inheritance_result_table.push({
                    relation : "son's daughter",
                    share : 1/6,
                    reason : "fardan",
                    mo3asib : false,
                    info : [
                        "if the shares are more then 1, Decreased from his share according to his original share",
                        "If there is anything left of the estate, it will be returned to her according to her share"
                    ]
                });
            }
        } else {
            inheritance_result_table.push({
                relation : "daughter",
                share : 2/3,
                reason : "fardan",
                mo3asib : false,
                info : [
                    "if the shares are more then 1, Decreased from his share according to his original share",
                    "If there is anything left of the estate, it will be returned to them according to there share"
                ]
            });
        }
    // WE NOW THAT SON'S DAUTHER EXISTS
    } else if(son_daughter == 1) {
        inheritance_result_table.push({
            relation : "son's daughter",
            share : 1/5,
            reason : "fardan",
            mo3asib : false,
            info : [
                "if the shares are more then 1, Decreased from his share according to his original share",
                "If there is anything left of the estate, it will be returned to her according to her share"
            ]
        });
    } else {
        inheritance_result_table.push({
            relation : "son's daughter",
            share : 2/3,
            reason : "fardan",
            mo3asib : false,
            info : [
                "if the shares are more then 1, Decreased from his share according to his original share",
                "If there is anything left of the estate, it will be returned to her according to her share"
            ]
        });
    }

    const sum_of_all_shares = sum(inheritance_result_table);
    // مسالة عائلة
    if(sum_of_all_shares >= 1) {
        for(let i = 0; i < inheritance_result_table.length; i++) {
            inheritance_result_table[i].share = inheritance_result_table[i].share * (1/sum_of_all_shares);
        }
    } else { // مسالة عادلة او ردية
        // -1 means there is no mo3asib
        const mo3asib_index = there_is_mo3asib(inheritance_result_table);
        if(mo3asib_index > -1) { // there is mo3asib, give him the rest
            const the_rest = 1 - sum_of_all_shares;
            inheritance_result_table[mo3asib_index].share += the_rest;
        } else { // there is no mo3asib , مسالة ردية
            give_back_the_rest(inheritance_result_table);
        }
    }


}



function fifth_diagram(table, inheritance_result_table) {
    const father = my_find(table, "father").number;
    const paternal_grandfather = my_find(table, "paternal grandfather").number;
    const mother = my_find(table, "mother").number;
    const maternal_grandmother = my_find(table, "maternal grandmother").number;
    const paternal_grandmother = my_find(table, "paternal grandmother").number;
    const full_brother= my_find(table, "full brother").number;
    const full_sister = my_find(table, "full sister").number;
    const wife = my_find(table, "wife").number;
    const husband = my_find(table, "husband").number;

    if(father == 1) {
        inheritance_result_table.push({
            relation : "father",
            share : 1/6,
            reason : "fardan",
            mo3asib : true,
            info : [
            ]
        });
    } else if(paternal_grandfather == 1) {
        inheritance_result_table.push({
            relation : "paternal grandfather",
            share : 1/6,
            reason : "fardan",
            mo3asib : true,
            info : []
        });
    }


    if(mother == 1) {
        if((full_brother+full_sister) > 1) {
            inheritance_result_table.push({
                relation : "mother",
                share : 1/6,
                reason : "fardan",
                mo3asib : false,
                info : [
                    "If there is anything left of the estate, it will be returned to him according to his share"
                ]
            });
        } else {
            inheritance_result_table.push({
                relation : "mother",
                share : 1/3,
                reason : "fardan",
                mo3asib : false,
                info : [
                    "If there is anything left of the estate, it will be returned to him according to his share"
                ]
            });
        }
    } else if(maternal_grandmother == 1) {
        if(paternal_grandmother == 1) {
            inheritance_result_table.push({
                relation : "maternal grandmother",
                share : 1/12,
                reason : "fardan",
                mo3asib : false,
                info : [
                    "If there is anything left of the estate, it will be returned to him according to his share"
                ]
            });
            inheritance_result_table.push({
                relation : "paternal grandmother",
                share : 1/12,
                reason : "fardan",
                mo3asib : false,
                info : [
                    "If there is anything left of the estate, it will be returned to him according to his share"
                ]
            });
        } else {
            inheritance_result_table.push({
                relation : "maternal grandmother",
                share : 1/6,
                reason : "fardan",
                mo3asib : false,
                info : [
                    "If there is anything left of the estate, it will be returned to him according to his share"
                ]
            });
        }
    } else if(paternal_grandmother == 1) {
        inheritance_result_table.push({
            relation : "paternal grandmother",
            share : 1/6,
            reason : "fardan",
            mo3asib : false,
            info : [
                "If there is anything left of the estate, it will be returned to him according to his share"
            ]
        });
    }



    if(husband == 1) {
        inheritance_result_table.push({
            relation : "husband",
            share : 1/2,
            reason : "fardan",
            mo3asib : false,
            info : [
                "If there is anything left of the estate, it will not be returned to him"
            ]
        });
    } else if(wife > 0) {
        inheritance_result_table.push({
            relation : "wife",
            share : 1/4,
            reason : "fardan",
            mo3asib : false,
            info : [
                "If there is anything left of the estate, it will not be returned to him"
            ]
        });
    }

    // // مسالة عادلة او ردية
    // const sum_of_all_shares = sum(inheritance_result_table);
    // const mo3asib_index = there_is_mo3asib(inheritance_result_table);
    // if(mo3asib_index > -1) { // there is mo3asib, give him the rest
    //     const the_rest = 1 - sum_of_all_shares;
    //     inheritance_result_table[mo3asib_index].share += the_rest;
    // } else { // there is no mo3asib , مسالة ردية
    //     give_back_the_rest(inheritance_result_table);
    // }






    const sum_of_all_shares = sum(inheritance_result_table);
    // مسالة عائلة
    if(sum_of_all_shares >= 1) {
        for(let i = 0; i < inheritance_result_table.length; i++) {
            inheritance_result_table[i].share = inheritance_result_table[i].share * (1/sum_of_all_shares);
        }
    } else if(sum_of_all_shares <= 1){ // مسالة عادلة او ردية
        // -1 means there is no mo3asib
        const mo3asib_index = there_is_mo3asib(inheritance_result_table);
        if(mo3asib_index > -1) { // there is mo3asib, give him the rest
            const the_rest = 1 - sum_of_all_shares;
            inheritance_result_table[mo3asib_index].share += the_rest;
        } else { // there is no mo3asib , مسالة ردية
            give_back_the_rest(inheritance_result_table);
        }
    }

}




function sixth_diagram(table, inheritance_result_table) {
    const mother = my_find(table, "mother").number;
    const full_brother = my_find(table, "full brother").number;
    const full_sister = my_find(table, "full sister").number;
    const maternal_grandmother = my_find(table, "maternal grandmother").number;
    const paternal_grandmother = my_find(table, "paternal grandmother").number;
    const wife = my_find(table, "wife").number;
    const husband = my_find(table, "husband").number;
    const mother_brother = my_find(table, "mother's brother").number;
    const mother_sister = my_find(table, "mother's sister").number;

    if(mother == 1) {
        if((full_brother+full_sister) > 1) {
            inheritance_result_table.push({
                relation : "mother",
                share : 1/6,
                reason : "fardan",
                mo3asib : true,
                info : [
                    "If there is anything left of the estate, it will be returned to him according to his share"
                ]
            });
        } else {
            inheritance_result_table.push({
                relation : "mother",
                share : 1/3,
                reason : "fardan",
                mo3asib : false,
                info : [
                    "If there is anything left of the estate, it will be returned to him according to his share"
                ]
            });
        }
    } else if(maternal_grandmother == 1) {
        if(paternal_grandmother == 1) {
            inheritance_result_table.push({
                relation : "maternal grandmother",
                share : 1/12,
                reason : "fardan",
                mo3asib : false,
                info : [
                    "If there is anything left of the estate, it will be returned to him according to his share"
                ]
            });
            inheritance_result_table.push({
                relation : "paternal grandmother",
                share : 1/12,
                reason : "fardan",
                mo3asib : false,
                info : [
                    "If there is anything left of the estate, it will be returned to him according to his share"
                ]
            });
        } else {
            inheritance_result_table.push({
                relation : "maternal grandmother",
                share : 1/6,
                reason : "fardan",
                mo3asib : false,
                info : [
                    "If there is anything left of the estate, it will be returned to him according to his share"
                ]
            });
        }
    } else if(paternal_grandmother == 1) {
        inheritance_result_table.push({
            relation : "paternal grandmother",
            share : 1/6,
            reason : "fardan",
            mo3asib : false,
            info : [
                "If there is anything left of the estate, it will be returned to him according to his share"
            ]
        });
    }



    if(husband == 1) {
        inheritance_result_table.push({
            relation : "husband",
            share : 1/2,
            reason : "fardan",
            mo3asib : false,
            info : [
                "If there is anything left of the estate, it will not be returned to him "
            ]
        });
    } else if(wife > 0) {
        inheritance_result_table.push({
            relation : "wife",
            share : 1/4,
            reason : "fardan",
            mo3asib : false,
            info : [
                "If there is anything left of the estate, it will not be returned to her "
            ]
        });
    }



    if((mother_brother+mother_sister) > 0) {
        if((mother_brother+mother_sister) == 1) {
            if(mother_brother == 1) {
                inheritance_result_table.push({
                    relation : "mother's brother",
                    share : 1/6,
                    reason : "fardan",
                    mo3asib : false,
                    info : [
                        "If there is anything left of the estate, it will be returned to him according to his share "
                    ]
                });
            } else { // mother_sister == 1
                
                inheritance_result_table.push({
                    relation : "mother's sister",
                    share : 1/6,
                    reason : "fardan",
                    mo3asib : false,
                    info : [
                        "If there is anything left of the estate, it will be returned to him according to his share"
                    ]
                });
            }
        } else {
            const mother_sisters_brothers_number = mother_brother+mother_sister;
            const one_mother_sibling_share = (1/3)/mother_sisters_brothers_number;
            // there is only sisters
            if(mother_brother == 0) {
                inheritance_result_table.push({
                    relation : "mother's sister",
                    share : 1/3,
                    reason : "fardan",
                    mo3asib : false,
                    info : [
                        "If there is anything left of the estate, it will be returned to him according to his share"
                    ]
                });
            //there is only brothers
            } else if(mother_sister == 0) {
                inheritance_result_table.push({
                    relation : "mother's brother",
                    share : 1/3,
                    reason : "fardan",
                    mo3asib : false,
                    info : [
                        "If there is anything left of the estate, it will be returned to him according to his share"
                    ]
                });
            } else {// there is mother's brothers and sisters
                inheritance_result_table.push({
                    relation : "mother's sister",
                    share : one_mother_sibling_share*mother_sister,
                    reason : "fardan",
                    mo3asib : false,
                    info : [
                        "If there is anything left of the estate, it will be returned to him according to his share"
                    ]
                });
                inheritance_result_table.push({
                    relation : "mother's brother",
                    share : one_mother_sibling_share*mother_brother,
                    reason : "fardan",
                    mo3asib : false,
                    info : [
                        "If there is anything left of the estate, it will be returned to him according to his share"
                    ]
                });
            }
        }
    }


    // give_back_the_rest(inheritance_result_table);


    const sum_of_all_shares = sum(inheritance_result_table);
    // مسالة عائلة
    if(sum_of_all_shares >= 1) {
        for(let i = 0; i < inheritance_result_table.length; i++) {
            inheritance_result_table[i].share = inheritance_result_table[i].share * (1/sum_of_all_shares);
        }
    } else { // مسالة عادلة او ردية
        // -1 means there is no mo3asib
        const mo3asib_index = there_is_mo3asib(inheritance_result_table);
        if(mo3asib_index > -1) { // there is mo3asib, give him the rest
            const the_rest = 1 - sum_of_all_shares;
            inheritance_result_table[mo3asib_index].share += the_rest;
        } else { // there is no mo3asib , مسالة ردية
            give_back_the_rest(inheritance_result_table);
        }
    }
}




// I STOPPED WORKING WITH INFO TABLE
function seventh_diagram(table, inheritance_result_table) {
    const mother = my_find(table, "mother").number;
    const maternal_grandmother = my_find(table, "maternal grandmother").number;
    const paternal_grandmother = my_find(table, "paternal grandmother").number;
    const wife = my_find(table, "wife").number;
    const husband = my_find(table, "husband").number;
    const daughter = my_find(table, "daughter").number;
    const son_daughter = my_find(table, "son's daughter").number;
    const full_brother = my_find(table, "full brother").number;
    const full_sister = my_find(table, "full sister").number;
    const father_sister = my_find(table, "father's sister").number;
    const father_brother = my_find(table, "father's brother").number;


    if(mother == 1) {
        inheritance_result_table.push({
            relation : "mother",
            share : 1/6,
            reason : "fardan",
            mo3asib : true,
            info : [
            ]
        });
    } else if(maternal_grandmother == 1) {
        if(paternal_grandmother == 1) {
            inheritance_result_table.push({
                relation : "maternal grandmother",
                share : 1/12,
                reason : "fardan",
                mo3asib : false,
                info : [
                    "If there is anything left of the estate, it will be returned to him according to his share"
                ]
            });
            inheritance_result_table.push({
                relation : "paternal grandmother",
                share : 1/12,
                reason : "fardan",
                mo3asib : false,
                info : [
                    "If there is anything left of the estate, it will be returned to him according to his share"
                ]
            });
        } else {
            inheritance_result_table.push({
                relation : "maternal grandmother",
                share : 1/6,
                reason : "fardan",
                mo3asib : false,
                info : [
                    "If there is anything left of the estate, it will be returned to him according to his share"
                ]
            });
        }
    } else if(paternal_grandmother == 1) {
        inheritance_result_table.push({
            relation : "paternal grandmother",
            share : 1/6,
            reason : "fardan",
            mo3asib : false,
            info : [
                "If there is anything left of the estate, it will be returned to him according to his share"
            ]
        });
    }


    if(husband == 1) {
        inheritance_result_table.push({
            relation : "husband",
            share : 1/4,
            reason : "fardan",
            mo3asib : false,
            info : [
                "If there is anything left of the estate, it will not be returned to him "
            ]
        });
    } else if(wife > 0) {
        inheritance_result_table.push({
            relation : "wife",
            share : 1/8,
            reason : "fardan",
            mo3asib : false,
            info : [
                "If there is anything left of the estate, it will not be returned to her "
            ]
        });
    }


    if(daughter > 0) {
        if(daughter == 1) {
            inheritance_result_table.push({
                relation : "daughter",
                share : 1/2,
                reason : "fardan",
                mo3asib : false,
                info : [
                    "If there is anything left of the estate, it will not be returned to her "
                ]
            });

            if(son_daughter > 0) {
                inheritance_result_table.push({
                    relation : "son's daughter",
                    share : 1/6,
                    reason : "fardan",
                    mo3asib : false,
                    info : [
                        "If there is anything left of the estate, it will not be returned to her "
                    ]
                });
            }
        } else {
            inheritance_result_table.push({
                relation : "daughter",
                share : 2/3,
                reason : "fardan",
                mo3asib : false,
                info : [
                    "If there is anything left of the estate, it will not be returned to her "
                ]
            });
        }
        // WE NOW THAT SON'S DAUGHTER EXISTS
    } else if(son_daughter == 1) {
        inheritance_result_table.push({
            relation : "son's daughter",
            share : 1/2,
            reason : "fardan",
            mo3asib : false,
            info : [
                "If there is anything left of the estate, it will not be returned to her "
            ]
        });
    } else {
        inheritance_result_table.push({
            relation : "son's daughter",
            share : 2/3,
            reason : "fardan",
            mo3asib : false,
            info : [
                "If there is anything left of the estate, it will not be returned to her "
            ]
        });
    }

    let the_rest = 1 - sum(inheritance_result_table);

    if(full_brother > 0) {
        if(sum(inheritance_result_table) <= 1) {
            if(full_sister > 0) {
                // للذكر حظ انثيين
                
                const brothers_sisters_number = full_sister+(full_brother*2);
                const one_sister_share = the_rest / brothers_sisters_number;
                inheritance_result_table.push({
                    relation : "full brother",
                    share : one_sister_share*full_brother*2,
                    reason : "ta3siban",
                    mo3asib : false,
                    info : [
                        "If there is anything left of the estate, it will not be returned to her "
                    ]
                });
                inheritance_result_table.push({
                    relation : "full sister",
                    share : one_sister_share*full_sister,
                    reason : "ta3siban",
                    mo3asib : false,
                    info : [
                        "If there is anything left of the estate, it will not be returned to her "
                    ]
                });
            } else {
                inheritance_result_table.push({
                    relation : "full brother",
                    share : the_rest,
                    reason : "ta3siban",
                    mo3asib : false,
                    info : [
                        "If there is anything left of the estate, it will not be returned to her "
                    ]
                });
            }
        }
    // WE KNOW THAT FATHER'S BROTHER EXISTS
    
    } else  {
        if(sum(inheritance_result_table) <= 1) {
            if(father_sister > 0) {
                the_rest = 1 - sum(inheritance_result_table);
                const father_brothers_sisters_number = father_sister+(father_brother*2);
                const one_father_sister_share = the_rest / father_brothers_sisters_number;
                inheritance_result_table.push({
                    relation : "father's brother",
                    share : one_father_sister_share*father_brother*2,
                    reason : "ta3siban",
                    mo3asib : false,
                    info : [
                        "If there is anything left of the estate, it will not be returned to her "
                    ]
                });
                inheritance_result_table.push({
                    relation : "father's sister",
                    share : one_father_sister_share*father_sister,
                    reason : "ta3siban",
                    mo3asib : false,
                    info : [
                        "If there is anything left of the estate, it will not be returned to her "
                    ]
                });
            } else {
            inheritance_result_table.push({
                relation : "father's brother",
                share : the_rest,
                reason : "ta3siban",
                mo3asib : false,
                info : [
                    "If there is anything left of the estate, it will not be returned to her "
                ]
            });
            }
        }
    }


    const sum_of_all_shares = sum(inheritance_result_table);
    // مسالة عائلة
    if(sum_of_all_shares >= 1) {
        for(let i = 0; i < inheritance_result_table.length; i++) {
            inheritance_result_table[i].share = inheritance_result_table[i].share * (1/sum_of_all_shares);
        }
    } else { // مسالة   ردية
        give_back_the_rest(inheritance_result_table);
    
    }

    
}




function eighth_diagram(table, inheritance_result_table) {
    const wife = my_find(table, "wife").number;
    const husband = my_find(table, "husband").number;
    const mother = my_find(table, "mother").number;
    const maternal_grandmother = my_find(table, "maternal grandmother").number;
    const paternal_grandmother = my_find(table, "paternal grandmother").number;
    const mother_brother= my_find(table, "mother's brother").number;
    const mother_sister= my_find(table, "mother's sister").number;
    const full_brother = my_find(table, "full brother").number;
    const full_sister= my_find(table, "full sister").number;
    const father_brother = my_find(table, "father's brother").number;
    const father_sister= my_find(table, "father's sister").number;


    if(mother == 1) {
        if( (full_brother+full_sister) > 1 ) {
            inheritance_result_table.push({
                relation : "mother",
                share : 1/6,
                reason : "fardan",
                mo3asib : true,
                info : [
                ]
            });
        } else {
            inheritance_result_table.push({
                relation : "mother",
                share : 1/3,
                reason : "fardan",
                mo3asib : true,
                info : [
                ]
            });
        }
    } else if(maternal_grandmother == 1) {
        if(paternal_grandmother == 1) {
            inheritance_result_table.push({
                relation : "maternal grandmother",
                share : 1/12,
                reason : "fardan",
                mo3asib : false,
                info : [
                    "If there is anything left of the estate, it will be returned to him according to his share"
                ]
            });
            inheritance_result_table.push({
                relation : "paternal grandmother",
                share : 1/12,
                reason : "fardan",
                mo3asib : false,
                info : [
                    "If there is anything left of the estate, it will be returned to him according to his share"
                ]
            });
        } else {
            inheritance_result_table.push({
                relation : "maternal grandmother",
                share : 1/6,
                reason : "fardan",
                mo3asib : false,
                info : [
                    "If there is anything left of the estate, it will be returned to him according to his share"
                ]
            });
        }
    } else if(paternal_grandmother == 1) {
        inheritance_result_table.push({
            relation : "paternal grandmother",
            share : 1/6,
            reason : "fardan",
            mo3asib : false,
            info : [
                "If there is anything left of the estate, it will be returned to him according to his share"
            ]
        });
    }



    if(husband == 1) {
        inheritance_result_table.push({
            relation : "husband",
            share : 1/2,
            reason : "fardan",
            mo3asib : false,
            info : [
                "If there is anything left of the estate, it will not be returned to him "
            ]
        });
    } else if(wife > 0) {
        inheritance_result_table.push({
            relation : "wife",
            share : 1/4,
            reason : "fardan",
            mo3asib : false,
            info : [
                "If there is anything left of the estate, it will not be returned to her "
            ]
        });
    }



    if((mother_brother + mother_sister) > 0) {
        if((mother_brother + mother_sister) == 1) {
            if(mother_sister == 1) {
                inheritance_result_table.push({
                    relation : "mother's sister",
                    share : 1/6,
                    reason : "fardan",
                    mo3asib : false,
                    info : [
                        "If there is anything left of the estate, it will not be returned to her "
                    ]
                });
            } else {
                inheritance_result_table.push({
                    relation : "mother's brother",
                    share : 1/6,
                    reason : "fardan",
                    mo3asib : false,
                    info : [
                        "If there is anything left of the estate, it will not be returned to her "
                    ]
                });
            }
        } else {
            let mother_brother_sister_number = mother_sister+mother_brother;
            let one_sibling_share = (1/3)/mother_brother_sister_number;
            inheritance_result_table.push({
                relation : "mother's brother",
                share : one_sibling_share*mother_brother,
                reason : "fardan",
                mo3asib : false,
                info : [
                    "If there is anything left of the estate, it will not be returned to her "
                ]
            });
            inheritance_result_table.push({
                relation : "mother's sister",
                share : one_sibling_share*mother_sister,
                reason : "fardan",
                mo3asib : false,
                info : [
                    "If there is anything left of the estate, it will not be returned to her "
                ]
            });
        }
    }


    let the_rest = 1 - sum(inheritance_result_table);
    if(full_brother > 0) {
        if(sum(inheritance_result_table) <= 1) {
            if(full_sister > 0) {
                const brothers_sisters_number = full_sister+(full_brother*2);
                const one_sister_share = the_rest / brothers_sisters_number;
                inheritance_result_table.push({
                    relation : "full brother",
                    share : one_sister_share*full_brother*2,
                    reason : "ta3siban",
                    mo3asib : false,
                    info : [
                        "If there is anything left of the estate, it will not be returned to her "
                    ]
                });
                inheritance_result_table.push({
                    relation : "full sister",
                    share : one_sister_share*full_sister,
                    reason : "ta3siban",
                    mo3asib : false,
                    info : [
                        "If there is anything left of the estate, it will not be returned to her "
                    ]
                });
            } else {
                inheritance_result_table.push({
                    relation : "full brother",
                    share : the_rest,
                    reason : "ta3siban",
                    mo3asib : false,
                    info : [
                        "If there is anything left of the estate, it will not be returned to her "
                    ]
                });
            }
        }
        
    } else {
        if(full_sister > 0) {
            if(full_sister == 1) {
                inheritance_result_table.push({
                    relation : "full sister",
                    share : 1/2,
                    reason : "fardan",
                    mo3asib : false,
                    info : [
                        "If there is anything left of the estate, it will not be returned to her "
                    ]
                });
            } else {
                inheritance_result_table.push({
                    relation : "full sister",
                    share : 2/3,
                    reason : "fardan",
                    mo3asib : false,
                    info : [
                        "If there is anything left of the estate, it will not be returned to her "
                    ]
                });
            }
        }



        // WE KNOW THAT FATHER'S BROTHER EXISTS
        the_rest = 1 - sum(inheritance_result_table);
        if(sum(inheritance_result_table) <= 1) {
            if(father_sister > 0) {
                the_rest = 1 - sum(inheritance_result_table);
                const father_brothers_sisters_number = father_sister+(father_brother*2);
                const one_father_sister_share = the_rest / father_brothers_sisters_number;
                inheritance_result_table.push({
                    relation : "father's brother",
                    share : one_father_sister_share*father_brother*2,
                    reason : "ta3siban",
                    mo3asib : false,
                    info : [
                        "If there is anything left of the estate, it will not be returned to her "
                    ]
                });
                inheritance_result_table.push({
                    relation : "father's sister",
                    share : one_father_sister_share*father_sister,
                    reason : "ta3siban",
                    mo3asib : false,
                    info : [
                        "If there is anything left of the estate, it will not be returned to her "
                    ]
                });
            } else {
                inheritance_result_table.push({
                    relation : "father's brother",
                    share : the_rest,
                    reason : "ta3siban",
                    mo3asib : false,
                    info : [
                        "If there is anything left of the estate, it will not be returned to her "
                    ]
                });
            }
        }
    }


    const sum_of_all_shares = sum(inheritance_result_table);
    // مسالة عائلة
    if(sum_of_all_shares >= 1) {
        for(let i = 0; i < inheritance_result_table.length; i++) {
            inheritance_result_table[i].share = inheritance_result_table[i].share * (1/sum_of_all_shares);
        }
    } else { // مسالة   ردية
        print("rediya")
        give_back_the_rest(inheritance_result_table);
    
    }
}




function ninth_diagram(table, inheritance_result_table) {
    const wife = my_find(table, "wife").number;
    const husband = my_find(table, "husband").number;
    const mother = my_find(table, "mother").number;
    const maternal_grandmother = my_find(table, "maternal grandmother").number;
    const paternal_grandmother = my_find(table, "paternal grandmother").number;
    const full_sister= my_find(table, "full sister").number;
    const father_sister= my_find(table, "father's sister").number;
    const daughter= my_find(table, "daughter").number;
    const son_daughter= my_find(table, "son's daughter").number;


    if(mother == 1) {
        inheritance_result_table.push({
            relation : "mother",
            share : 1/6,
            reason : "fardan",
            mo3asib : true,
            info : [
            ]
        });
    } else if(maternal_grandmother == 1) {
        if(paternal_grandmother == 1) {
            inheritance_result_table.push({
                relation : "maternal grandmother",
                share : 1/12,
                reason : "fardan",
                mo3asib : false,
                info : [
                    "If there is anything left of the estate, it will be returned to him according to his share"
                ]
            });
            inheritance_result_table.push({
                relation : "paternal grandmother",
                share : 1/12,
                reason : "fardan",
                mo3asib : false,
                info : [
                    "If there is anything left of the estate, it will be returned to him according to his share"
                ]
            });
        } else {
            inheritance_result_table.push({
                relation : "maternal grandmother",
                share : 1/6,
                reason : "fardan",
                mo3asib : false,
                info : [
                    "If there is anything left of the estate, it will be returned to him according to his share"
                ]
            });
        }
    } else if(paternal_grandmother == 1) {
        inheritance_result_table.push({
            relation : "paternal grandmother",
            share : 1/6,
            reason : "fardan",
            mo3asib : false,
            info : [
                "If there is anything left of the estate, it will be returned to him according to his share"
            ]
        });
    }




    if(husband == 1) {
        inheritance_result_table.push({
            relation : "husband",
            share : 1/4,
            reason : "fardan",
            mo3asib : false,
            info : [
                "If there is anything left of the estate, it will not be returned to him "
            ]
        });
    } else if(wife > 0) {
        inheritance_result_table.push({
            relation : "wife",
            share : 1/8,
            reason : "fardan",
            mo3asib : false,
            info : [
                "If there is anything left of the estate, it will not be returned to her "
            ]
        });
    }





    if(daughter > 0) {
        if(daughter == 1) {
            inheritance_result_table.push({
                relation : "daughter",
                share : 1/2,
                reason : "fardan",
                mo3asib : false,
                info : [
                    "If there is anything left of the estate, it will not be returned to her "
                ]
            });

            if(son_daughter > 0) {
                inheritance_result_table.push({
                    relation : "son's daughter",
                    share : 1/6,
                    reason : "fardan",
                    mo3asib : false,
                    info : [
                        "If there is anything left of the estate, it will not be returned to her "
                    ]
                });
            }
        } else {
            inheritance_result_table.push({
                relation : "daughter",
                share : 2/3,
                reason : "fardan",
                mo3asib : false,
                info : [
                    "If there is anything left of the estate, it will not be returned to her "
                ]
            });
        }
    // WE KNOW THAT SON'S DAUGHTER EXISTS
    } else if(son_daughter == 1) {
        inheritance_result_table.push({
            relation : "son's daughter",
            share : 1/2,
            reason : "fardan",
            mo3asib : false,
            info : [
                "If there is anything left of the estate, it will not be returned to her "
            ]
        });
    } else {
        inheritance_result_table.push({
            relation : "son's daughter",
            share : 2/3,
            reason : "fardan",
            mo3asib : false,
            info : [
                "If there is anything left of the estate, it will not be returned to her "
            ]
        });
    }


    let the_rest = 1 - sum(inheritance_result_table);
    if(sum(inheritance_result_table) <= 1) {
        if(full_sister > 0) {
            inheritance_result_table.push({
                relation : "full sister",
                share : the_rest,
                reason : "ta3siban with daughter/son's daughter",
                mo3asib : false,
                info : [
                    "If there is anything left of the estate, it will not be returned to her "
                ]
            });
        } else {
            inheritance_result_table.push({
                relation : "father's sister",
                share : the_rest,
                reason : "ta3siban with daughter/son's daughter",
                mo3asib : false,
                info : [
                    "If there is anything left of the estate, it will not be returned to her "
                ]
            });
        }
    }


    const sum_of_all_shares = sum(inheritance_result_table);
    // مسالة عائلة
    if(sum_of_all_shares >= 1) {
        for(let i = 0; i < inheritance_result_table.length; i++) {
            inheritance_result_table[i].share = inheritance_result_table[i].share * (1/sum_of_all_shares);
        }
    } else { // مسالة   ردية
        print("rediya")
        give_back_the_rest(inheritance_result_table);
    
    }

    
}




function tenth_diagram(table, inheritance_result_table) {
    const wife = my_find(table, "wife").number;
    const husband = my_find(table, "husband").number;
    const mother = my_find(table, "mother").number;
    const maternal_grandmother = my_find(table, "maternal grandmother").number;
    const paternal_grandmother = my_find(table, "paternal grandmother").number;
    const full_sister= my_find(table, "full sister").number;
    const full_brother= my_find(table, "full brother").number;
    const father_sister= my_find(table, "father's sister").number;
    const mother_brother= my_find(table, "mother's brother").number;
    const mother_sister= my_find(table, "mother's sister").number;



    if(mother == 1) {
        if( (full_brother+full_sister) > 1 ) {
            inheritance_result_table.push({
                relation : "mother",
                share : 1/6,
                reason : "fardan",
                mo3asib : true,
                info : [
                ]
            });
        } else {
            inheritance_result_table.push({
                relation : "mother",
                share : 1/3,
                reason : "fardan",
                mo3asib : true,
                info : [
                ]
            });
        }
    } else if(maternal_grandmother == 1) {
        if(paternal_grandmother == 1) {
            inheritance_result_table.push({
                relation : "maternal grandmother",
                share : 1/12,
                reason : "fardan",
                mo3asib : false,
                info : [
                    "If there is anything left of the estate, it will be returned to him according to his share"
                ]
            });
            inheritance_result_table.push({
                relation : "paternal grandmother",
                share : 1/12,
                reason : "fardan",
                mo3asib : false,
                info : [
                    "If there is anything left of the estate, it will be returned to him according to his share"
                ]
            });
        } else {
            inheritance_result_table.push({
                relation : "maternal grandmother",
                share : 1/6,
                reason : "fardan",
                mo3asib : false,
                info : [
                    "If there is anything left of the estate, it will be returned to him according to his share"
                ]
            });
        }
    } else if(paternal_grandmother == 1) {
        inheritance_result_table.push({
            relation : "paternal grandmother",
            share : 1/6,
            reason : "fardan",
            mo3asib : false,
            info : [
                "If there is anything left of the estate, it will be returned to him according to his share"
            ]
        });
    }
    



    if(husband == 1) {
        inheritance_result_table.push({
            relation : "husband",
            share : 1/2,
            reason : "fardan",
            mo3asib : false,
            info : [
                "If there is anything left of the estate, it will not be returned to him "
            ]
        });
    } else if(wife > 0) {
        inheritance_result_table.push({
            relation : "wife",
            share : 1/4,
            reason : "fardan",
            mo3asib : false,
            info : [
                "If there is anything left of the estate, it will not be returned to her "
            ]
        });
    }
    



    if((mother_brother + mother_sister) > 0) {
        if((mother_brother + mother_sister) == 1) {
            if(mother_sister == 1) {
                inheritance_result_table.push({
                    relation : "mother's sister",
                    share : 1/6,
                    reason : "fardan",
                    mo3asib : false,
                    info : [
                        "If there is anything left of the estate, it will not be returned to her "
                    ]
                });
            } else {
                inheritance_result_table.push({
                    relation : "mother's brother",
                    share : 1/6,
                    reason : "fardan",
                    mo3asib : false,
                    info : [
                        "If there is anything left of the estate, it will not be returned to her "
                    ]
                });
            }
        } else {
            let mother_brother_sister_number = mother_sister+mother_brother;
            let one_sibling_share = (1/3)/mother_brother_sister_number;
            inheritance_result_table.push({
                relation : "mother's brother",
                share : one_sibling_share*mother_brother,
                reason : "fardan",
                mo3asib : false,
                info : [
                    "If there is anything left of the estate, it will not be returned to her "
                ]
            });
            inheritance_result_table.push({
                relation : "mother's sister",
                share : one_sibling_share*mother_sister,
                reason : "fardan",
                mo3asib : false,
                info : [
                    "If there is anything left of the estate, it will not be returned to her "
                ]
            });
        }
    }
    



    if(full_sister > 0) {
        if(full_sister == 1) {
            inheritance_result_table.push({
                relation : "full sister",
                share : 1/2,
                reason : "fardan",
                mo3asib : false,
                info : [
                    "If there is anything left of the estate, it will not be returned to her "
                ]
            });

            if(father_sister > 0) {
                inheritance_result_table.push({
                    relation : "father's sister",
                    share : 1/6,
                    reason : "fardan",
                    mo3asib : false,
                    info : [
                        "If there is anything left of the estate, it will not be returned to her "
                    ]
                });
            }
        } else {
            inheritance_result_table.push({
                relation : "full sister",
                share : 2/3,
                reason : "fardan",
                mo3asib : false,
                info : [
                    "If there is anything left of the estate, it will not be returned to her "
                ]
            });
        }
    // WE KNOW THAT FATHER'S SISTER EXISTS
    } else if(father_sister == 1) {
        inheritance_result_table.push({
            relation : "father's sister",
            share : 1/2,
            reason : "fardan",
            mo3asib : false,
            info : [
                "If there is anything left of the estate, it will not be returned to her "
            ]
        });
    } else {
        inheritance_result_table.push({
            relation : "father's sister",
            share : 2/3,
            reason : "fardan",
            mo3asib : false,
            info : [
                "If there is anything left of the estate, it will not be returned to her "
            ]
        });
    }



    const sum_of_all_shares = sum(inheritance_result_table);
    // مسالة عائلة
    if(sum_of_all_shares >= 1) {
        for(let i = 0; i < inheritance_result_table.length; i++) {
            inheritance_result_table[i].share = inheritance_result_table[i].share * (1/sum_of_all_shares);
        }
    } else { // مسالة   ردية
        print("rediya")
        give_back_the_rest(inheritance_result_table);
    
    }
}




function eleventh_diagram(table, inheritance_result_table) {
    const wife = my_find(table, "wife").number;
    const husband = my_find(table, "husband").number;
    const mother = my_find(table, "mother").number;
    const maternal_grandmother = my_find(table, "maternal grandmother").number;
    const paternal_grandmother = my_find(table, "paternal grandmother").number;            
    const daughter = my_find(table, "daughter").number;
    const son_daughter = my_find(table, "son's daughter").number;

    // ابن الاخ الشقيق
    const full_brother_son = my_find(table, "full brother's son").number;
    // ابن الاخ لاب
    const paternal_uncle_son = my_find(table, "paternal uncle's son").number;
    // العم الشقيق
    const father_full_brother = my_find(table, "father's full brother").number;
    // العم لاب
    const father_paternal_uncle = my_find(table, "father's paternal uncle").number;
    // ابن العم الشقيق
    const full_paternal_uncle_son = my_find(table, "full paternal uncle's son").number;
    // يوجد ابن العم لاب
    const father_paternal_uncle_son = my_find(table, "father's paternal uncle's son").number;



    if(mother == 1) {
        inheritance_result_table.push({
            relation : "mother",
            share : 1/6,
            reason : "fardan",
            mo3asib : true,
            info : [
            ]
        });
    } else if(maternal_grandmother == 1) {
        if(paternal_grandmother == 1) {
            inheritance_result_table.push({
                relation : "maternal grandmother",
                share : 1/12,
                reason : "fardan",
                mo3asib : false,
                info : [
                    "If there is anything left of the estate, it will be returned to him according to his share"
                ]
            });
            inheritance_result_table.push({
                relation : "paternal grandmother",
                share : 1/12,
                reason : "fardan",
                mo3asib : false,
                info : [
                    "If there is anything left of the estate, it will be returned to him according to his share"
                ]
            });
        } else {
            inheritance_result_table.push({
                relation : "maternal grandmother",
                share : 1/6,
                reason : "fardan",
                mo3asib : false,
                info : [
                    "If there is anything left of the estate, it will be returned to him according to his share"
                ]
            });
        }
    } else if(paternal_grandmother == 1) {
        inheritance_result_table.push({
            relation : "paternal grandmother",
            share : 1/6,
            reason : "fardan",
            mo3asib : false,
            info : [
                "If there is anything left of the estate, it will be returned to him according to his share"
            ]
        });
    }




    if(husband == 1) {
        inheritance_result_table.push({
            relation : "husband",
            share : 1/4,
            reason : "fardan",
            mo3asib : false,
            info : [
                "If there is anything left of the estate, it will not be returned to him "
            ]
        });
    } else if(wife > 0) {
        inheritance_result_table.push({
            relation : "wife",
            share : 1/8,
            reason : "fardan",
            mo3asib : false,
            info : [
                "If there is anything left of the estate, it will not be returned to her "
            ]
        });
    }


    

    if(daughter > 0) {
        if(daughter == 1) {
            inheritance_result_table.push({
                relation : "daughter",
                share : 1/2,
                reason : "fardan",
                mo3asib : false,
                info : [
                    "If there is anything left of the estate, it will not be returned to her "
                ]
            });

            if(son_daughter > 0) {
                inheritance_result_table.push({
                    relation : "son's daughter",
                    share : 1/6,
                    reason : "fardan",
                    mo3asib : false,
                    info : [
                        "If there is anything left of the estate, it will not be returned to her "
                    ]
                });
            }
        } else {
            inheritance_result_table.push({
                relation : "daughter",
                share : 2/3,
                reason : "fardan",
                mo3asib : false,
                info : [
                    "If there is anything left of the estate, it will not be returned to her "
                ]
            });
        }
    // WE KNOW THAT SON'S DAUGHTER EXISTS
    } else if(son_daughter == 1) {
        inheritance_result_table.push({
            relation : "son's daughter",
            share : 1/2,
            reason : "fardan",
            mo3asib : false,
            info : [
                "If there is anything left of the estate, it will not be returned to her "
            ]
        });
    } else {
        inheritance_result_table.push({
            relation : "son's daughter",
            share : 2/3,
            reason : "fardan",
            mo3asib : false,
            info : [
                "If there is anything left of the estate, it will not be returned to her "
            ]
        });
    }


    let the_rest = 1 - sum(inheritance_result_table);
    if(sum(inheritance_result_table) <= 1) {
        let the_one_that_exists = "";

        if(full_brother_son > 0) {
            the_one_that_exists = "full brother's son";
        } else if(paternal_uncle_son > 0) {
            the_one_that_exists = "paternal uncle's son";
        } else if(father_full_brother > 0) {
            the_one_that_exists = "father's full brother";
        } else if(father_paternal_uncle > 0) {
            the_one_that_exists = "father's paternal uncle";
        } else if(full_paternal_uncle_son > 0) {
            the_one_that_exists = "full paternal uncle's son";
        } else {
            // WE KNOW THAT father_paternal_uncle_son EXISTS                
            the_one_that_exists = "father's paternal uncle's son";
        }

        inheritance_result_table.push({
            relation : the_one_that_exists,
            share : the_rest,
            reason : "ta3siban",
            mo3asib : false,
            info : [
                "If there is anything left of the estate, it will not be returned to her "
            ]
        });


    }


    const sum_of_all_shares = sum(inheritance_result_table);
    // مسالة عائلة
    if(sum_of_all_shares >= 1) {
        for(let i = 0; i < inheritance_result_table.length; i++) {
            inheritance_result_table[i].share = inheritance_result_table[i].share * (1/sum_of_all_shares);
        }
    } else { // مسالة   ردية
        print("rediya")
        give_back_the_rest(inheritance_result_table);
    
    }


}



function twelveth_diagram(table, inheritance_result_table) {
    const wife = my_find(table, "wife").number;
    const husband = my_find(table, "husband").number;
    const mother = my_find(table, "mother").number;
    const maternal_grandmother = my_find(table, "maternal grandmother").number;
    const paternal_grandmother = my_find(table, "paternal grandmother").number;

    const mother_brother = my_find(table, "mother's brother").number;    
    const mother_sister = my_find(table, "mother's sister").number;    
    const full_sister = my_find(table, "full sister").number;    
    const full_brother = my_find(table, "full brother").number;    
    const father_sister = my_find(table, "father's sister").number;    

    // ابن الاخ الشقيق
    const full_brother_son = my_find(table, "full brother's son").number;
    // ابن الاخ لاب
    const paternal_uncle_son = my_find(table, "paternal uncle's son").number;
    // العم الشقيق
    const father_full_brother = my_find(table, "father's full brother").number;
    // العم لاب
    const father_paternal_uncle = my_find(table, "father's paternal uncle").number;
    // ابن العم الشقيق
    const full_paternal_uncle_son = my_find(table, "full paternal uncle's son").number;
    // يوجد ابن العم لاب
    const father_paternal_uncle_son = my_find(table, "father's paternal uncle's son").number;


    if(mother == 1) {
        if( (full_brother+full_sister) > 1 ) {
            inheritance_result_table.push({
                relation : "mother",
                share : 1/6,
                reason : "fardan",
                mo3asib : true,
                info : [
                ]
            });
        } else {
            inheritance_result_table.push({
                relation : "mother",
                share : 1/3,
                reason : "fardan",
                mo3asib : true,
                info : [
                ]
            });
        }
    } else if(maternal_grandmother == 1) {
        if(paternal_grandmother == 1) {
            inheritance_result_table.push({
                relation : "maternal grandmother",
                share : 1/12,
                reason : "fardan",
                mo3asib : false,
                info : [
                    "If there is anything left of the estate, it will be returned to him according to his share"
                ]
            });
            inheritance_result_table.push({
                relation : "paternal grandmother",
                share : 1/12,
                reason : "fardan",
                mo3asib : false,
                info : [
                    "If there is anything left of the estate, it will be returned to him according to his share"
                ]
            });
        } else {
            inheritance_result_table.push({
                relation : "maternal grandmother",
                share : 1/6,
                reason : "fardan",
                mo3asib : false,
                info : [
                    "If there is anything left of the estate, it will be returned to him according to his share"
                ]
            });
        }
    } else if(paternal_grandmother == 1) {
        inheritance_result_table.push({
            relation : "paternal grandmother",
            share : 1/6,
            reason : "fardan",
            mo3asib : false,
            info : [
                "If there is anything left of the estate, it will be returned to him according to his share"
            ]
        });
    }
    



    if(husband == 1) {
        inheritance_result_table.push({
            relation : "husband",
            share : 1/2,
            reason : "fardan",
            mo3asib : false,
            info : [
                "If there is anything left of the estate, it will not be returned to him "
            ]
        });
    } else if(wife > 0) {
        inheritance_result_table.push({
            relation : "wife",
            share : 1/4,
            reason : "fardan",
            mo3asib : false,
            info : [
                "If there is anything left of the estate, it will not be returned to her "
            ]
        });
    }



    if((mother_brother + mother_sister) > 0) {
        if((mother_brother + mother_sister) == 1) {
            if(mother_sister == 1) {
                inheritance_result_table.push({
                    relation : "mother's sister",
                    share : 1/6,
                    reason : "fardan",
                    mo3asib : false,
                    info : [
                        "If there is anything left of the estate, it will not be returned to her "
                    ]
                });
            } else {
                inheritance_result_table.push({
                    relation : "mother's brother",
                    share : 1/6,
                    reason : "fardan",
                    mo3asib : false,
                    info : [
                        "If there is anything left of the estate, it will not be returned to her "
                    ]
                });
            }
        } else {
            let mother_brother_sister_number = mother_sister+mother_brother;
            let one_sibling_share = (1/3)/mother_brother_sister_number;
            inheritance_result_table.push({
                relation : "mother's brother",
                share : one_sibling_share*mother_brother,
                reason : "fardan",
                mo3asib : false,
                info : [
                    "If there is anything left of the estate, it will not be returned to her "
                ]
            });
            inheritance_result_table.push({
                relation : "mother's sister",
                share : one_sibling_share*mother_sister,
                reason : "fardan",
                mo3asib : false,
                info : [
                    "If there is anything left of the estate, it will not be returned to her "
                ]
            });
        }
    }


    if(full_sister > 0) {
        if(full_sister == 1) {
            inheritance_result_table.push({
                relation : "full sister",
                share : 1/2,
                reason : "fardan",
                mo3asib : false,
                info : [
                    "If there is anything left of the estate, it will not be returned to her "
                ]
            });

            if(father_sister > 0) {
                inheritance_result_table.push({
                    relation : "father's sister",
                    share : 1/6,
                    reason : "fardan",
                    mo3asib : false,
                    info : [
                        "If there is anything left of the estate, it will not be returned to her "
                    ]
                });
            }
        } else {
            inheritance_result_table.push({
                relation : "full sister",
                share : 2/3,
                reason : "fardan",
                mo3asib : false,
                info : [
                    "If there is anything left of the estate, it will not be returned to her "
                ]
            });
        }
    // WE KNOW THAT FATHER'S SISTER EXISTS
    } else if(father_sister == 1) {
        inheritance_result_table.push({
            relation : "father's sister",
            share : 1/2,
            reason : "fardan",
            mo3asib : false,
            info : [
                "If there is anything left of the estate, it will not be returned to her "
            ]
        });
    } else {
        inheritance_result_table.push({
            relation : "father's sister",
            share : 2/3,
            reason : "fardan",
            mo3asib : false,
            info : [
                "If there is anything left of the estate, it will not be returned to her "
            ]
        });
    }



    let the_rest = 1 - sum(inheritance_result_table);
    if(sum(inheritance_result_table) <= 1) {
        let the_one_that_exists = "";

        if(full_brother_son > 0) {
            the_one_that_exists = "full brother's son";
        } else if(paternal_uncle_son > 0) {
            the_one_that_exists = "paternal uncle's son";
        } else if(father_full_brother > 0) {
            the_one_that_exists = "father's full brother";
        } else if(father_paternal_uncle > 0) {
            the_one_that_exists = "father's paternal uncle";
        } else if(full_paternal_uncle_son > 0) {
            the_one_that_exists = "full paternal uncle's son";
        } else {
            // WE KNOW THAT father_paternal_uncle_son EXISTS                
            the_one_that_exists = "father's paternal uncle's son";
        }

        inheritance_result_table.push({
            relation : the_one_that_exists,
            share : the_rest,
            reason : "ta3siban",
            mo3asib : false,
            info : [
                "If there is anything left of the estate, it will not be returned to her "
            ]
        });
    }



    const sum_of_all_shares = sum(inheritance_result_table);
    // مسالة عائلة
    if(sum_of_all_shares >= 1) {
        for(let i = 0; i < inheritance_result_table.length; i++) {
            inheritance_result_table[i].share = inheritance_result_table[i].share * (1/sum_of_all_shares);
        }
    } else { // مسالة   ردية
        print("rediya")
        give_back_the_rest(inheritance_result_table);
    
    }
    
}



function thirteenth_diagram(table, inheritance_result_table) {
    const wife = my_find(table, "wife").number;
    const husband = my_find(table, "husband").number;
    const mother = my_find(table, "mother").number;
    const maternal_grandmother = my_find(table, "maternal grandmother").number;
    const paternal_grandmother = my_find(table, "paternal grandmother").number;

    const mother_brother = my_find(table, "mother's brother").number;    
    const mother_sister = my_find(table, "mother's sister").number;    
    const full_sister = my_find(table, "full sister").number;    
    const full_brother = my_find(table, "full brother").number;    
    // const father_sister = my_find(table, "father's sister").number;    

    // ابن الاخ الشقيق
    const full_brother_son = my_find(table, "full brother's son").number;
    // ابن الاخ لاب
    const paternal_uncle_son = my_find(table, "paternal uncle's son").number;
    // العم الشقيق
    const father_full_brother = my_find(table, "father's full brother").number;
    // العم لاب
    const father_paternal_uncle = my_find(table, "father's paternal uncle").number;
    // ابن العم الشقيق
    const full_paternal_uncle_son = my_find(table, "full paternal uncle's son").number;
    // يوجد ابن العم لاب
    const father_paternal_uncle_son = my_find(table, "father's paternal uncle's son").number;


    if(mother == 1) {
        if( (full_brother+full_sister) > 1 ) {
            inheritance_result_table.push({
                relation : "mother",
                share : 1/6,
                reason : "fardan",
                mo3asib : true,
                info : [
                ]
            });
        } else {
            inheritance_result_table.push({
                relation : "mother",
                share : 1/3,
                reason : "fardan",
                mo3asib : true,
                info : [
                ]
            });
        }
    } else if(maternal_grandmother == 1) {
        if(paternal_grandmother == 1) {
            inheritance_result_table.push({
                relation : "maternal grandmother",
                share : 1/12,
                reason : "fardan",
                mo3asib : false,
                info : [
                    "If there is anything left of the estate, it will be returned to him according to his share"
                ]
            });
            inheritance_result_table.push({
                relation : "paternal grandmother",
                share : 1/12,
                reason : "fardan",
                mo3asib : false,
                info : [
                    "If there is anything left of the estate, it will be returned to him according to his share"
                ]
            });
        } else {
            inheritance_result_table.push({
                relation : "maternal grandmother",
                share : 1/6,
                reason : "fardan",
                mo3asib : false,
                info : [
                    "If there is anything left of the estate, it will be returned to him according to his share"
                ]
            });
        }
    } else if(paternal_grandmother == 1) {
        inheritance_result_table.push({
            relation : "paternal grandmother",
            share : 1/6,
            reason : "fardan",
            mo3asib : false,
            info : [
                "If there is anything left of the estate, it will be returned to him according to his share"
            ]
        });
    }
    



    if(husband == 1) {
        inheritance_result_table.push({
            relation : "husband",
            share : 1/2,
            reason : "fardan",
            mo3asib : false,
            info : [
                "If there is anything left of the estate, it will not be returned to him "
            ]
        });
    } else if(wife > 0) {
        inheritance_result_table.push({
            relation : "wife",
            share : 1/4,
            reason : "fardan",
            mo3asib : false,
            info : [
                "If there is anything left of the estate, it will not be returned to her "
            ]
        });
    }



    if((mother_brother + mother_sister) > 0) {
        if((mother_brother + mother_sister) == 1) {
            if(mother_sister == 1) {
                inheritance_result_table.push({
                    relation : "mother's sister",
                    share : 1/6,
                    reason : "fardan",
                    mo3asib : false,
                    info : [
                        "If there is anything left of the estate, it will not be returned to her "
                    ]
                });
            } else {
                inheritance_result_table.push({
                    relation : "mother's brother",
                    share : 1/6,
                    reason : "fardan",
                    mo3asib : false,
                    info : [
                        "If there is anything left of the estate, it will not be returned to her "
                    ]
                });
            }
        } else {
            let mother_brother_sister_number = mother_sister+mother_brother;
            let one_sibling_share = (1/3)/mother_brother_sister_number;
            inheritance_result_table.push({
                relation : "mother's brother",
                share : one_sibling_share*mother_brother,
                reason : "fardan",
                mo3asib : false,
                info : [
                    "If there is anything left of the estate, it will not be returned to her "
                ]
            });
            inheritance_result_table.push({
                relation : "mother's sister",
                share : one_sibling_share*mother_sister,
                reason : "fardan",
                mo3asib : false,
                info : [
                    "If there is anything left of the estate, it will not be returned to her "
                ]
            });
        }
    }


    let the_rest = 1 - sum(inheritance_result_table);
    if(sum(inheritance_result_table) <= 1) {
        let the_one_that_exists = "";

        if(full_brother_son > 0) {
            the_one_that_exists = "full brother's son";
        } else if(paternal_uncle_son > 0) {
            the_one_that_exists = "paternal uncle's son";
        } else if(father_full_brother > 0) {
            the_one_that_exists = "father's full brother";
        } else if(father_paternal_uncle > 0) {
            the_one_that_exists = "father's paternal uncle";
        } else if(full_paternal_uncle_son > 0) {
            the_one_that_exists = "full paternal uncle's son";
        } else {
            // WE KNOW THAT father_paternal_uncle_son EXISTS                
            the_one_that_exists = "father's paternal uncle's son";
        }

        inheritance_result_table.push({
            relation : the_one_that_exists,
            share : the_rest,
            reason : "ta3siban",
            mo3asib : false,
            info : [
                "If there is anything left of the estate, it will not be returned to her "
            ]
        });
    }



    const sum_of_all_shares = sum(inheritance_result_table);
    // مسالة عائلة
    if(sum_of_all_shares >= 1) {
        for(let i = 0; i < inheritance_result_table.length; i++) {
            inheritance_result_table[i].share = inheritance_result_table[i].share * (1/sum_of_all_shares);
        }
    } else { // مسالة   ردية
        print("rediya")
        give_back_the_rest(inheritance_result_table);
    
    }
}


// =============================================================
// =============================================================
// =============================================================
function there_is_forod_3isba(table) {
    for(let i = 0; i < table.length; i++ ) {
        if(table[i].number > 0) {
            return true
        }
    }
    return false;
}

function there_is_only_spouse(table) {
    const wife = my_find(table, "wife").number;
    const husband = my_find(table, "husband").number;

    let sum_of_people = 0;
    for(let i = 0; i < table.length; i++) {
        sum_of_people += table[i].number;
    }

    let condition = (sum_of_people == 1 && (wife+husband) == 1) || (sum_of_people == 2 && wife == 2) || (sum_of_people == 3 && wife == 3) ||(sum_of_people == 4 && wife == 4);

    if(condition) {
        return true;
    }
    return false;
}


function is_exceptional_case(table) {
    const mother = my_find(table, "mother").number;
    const father = my_find(table, "father").number;
    const wife = my_find(table, "wife").number;
    const husband = my_find(table, "husband").number;
    const full_brother = my_find(table, "full brother").number;
    const full_sister = my_find(table, "full sister").number;

    let sum_of_people = 0;
    for(let i = 0; i < table.length; i++) {
        sum_of_people += table[i].number;
    }

    if(
        mother == 1 &&
        father == 1 &&
        (wife+husband) == 1 &&
        (sum_of_people == 3 || (sum_of_people == 4 && (full_brother == 1 || full_sister == 1)) )
    ) {
        return true
    }
    return false;
}

function is_exceptional_case2(table) {

}

export default function path_diagram(table, inheritance_result_table) {
    const son = my_find(table, "son").number;
    const son_son = my_find(table, "son's son").number;
    const full_brother = my_find(table, "full brother").number;
    const full_sister = my_find(table, "full sister").number;
    const father_brother = my_find(table, "father's brother").number;
    const father_sister = my_find(table, "father's sister").number;
    const mother_brother = my_find(table, "mother's brother").number;
    const mother_sister = my_find(table, "mother's sister").number;
    const daughter = my_find(table, "daughter").number;
    const son_daughter = my_find(table, "son's daughter").number;

    
    // ابن الاخ الشقيق
    const full_brother_son = my_find(table, "full brother's son").number;
    // ابن الاخ لاب
    const paternal_uncle_son = my_find(table, "paternal uncle's son").number;
    // العم الشقيق
    const father_full_brother = my_find(table, "father's full brother").number;
    // العم لاب
    const father_paternal_uncle = my_find(table, "father's paternal uncle").number;
    // ابن العم الشقيق
    const full_paternal_uncle_son = my_find(table, "full paternal uncle's son").number;
    // يوجد ابن العم لاب
    const father_paternal_uncle_son = my_find(table, "father's paternal uncle's son").number;


    if(there_is_forod_3isba(table)) {
        if(there_is_only_spouse(table)) {
            print("diagram 1");
            first_diagram(table, inheritance_result_table);
        } else if (is_exceptional_case(table)) {
            print("diagram 2");
            second_diagram(table, inheritance_result_table);
        } else if(son > 0 || son_son > 0) {
            print("diagram 3");
            third_diagram(table, inheritance_result_table);
        } else if(full_brother > 0 || father_brother > 0) {
            if(daughter + son_daughter > 0) {
                print("diagram 7");
                seventh_diagram(table, inheritance_result_table);
            } else {
                print("diagram 8");
                eighth_diagram(table, inheritance_result_table);
            }
        } else if(full_sister > 0 || father_sister > 0) {
            if(daughter + son_daughter > 0) {
                print("diagram 9");
                ninth_diagram(table, inheritance_result_table);
            } else if(
                full_brother_son>0 ||
                paternal_uncle_son>0||
                father_full_brother>0||
                father_paternal_uncle>0||
                full_paternal_uncle_son>0||
                father_paternal_uncle_son>0
            ) {
                print("diagram 12");
                twelveth_diagram(table, inheritance_result_table);
            } else {
                print("diagram 10");
                tenth_diagram(table, inheritance_result_table);
            }
        } else if(
            full_brother_son>0 ||
            paternal_uncle_son>0||
            father_full_brother>0||
            father_paternal_uncle>0||
            full_paternal_uncle_son>0||
            father_paternal_uncle_son>0
        ) {
            if(daughter + son_daughter > 0) {
                print("diagram 11");
                eleventh_diagram(table, inheritance_result_table);
            } else {
                print("diagram 13");
                thirteenth_diagram(table, inheritance_result_table);
            }
        } else if(daughter + son_daughter > 0) {
            print("diagram 4");
            fourth_diagram(table, inheritance_result_table);
        } else if(mother_brother + mother_sister > 0) {
            print("diagram 6");
            sixth_diagram(table, inheritance_result_table);
        } else {
            print("diagram 5");
            fifth_diagram(table, inheritance_result_table);
        }
    } else {
        print("tarika for dawi arham or the State Treasury");
    }
}


