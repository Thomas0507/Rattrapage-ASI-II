package com.projet_asi_ii.asi_ii.entities;


import com.projet_asi_ii.asi_ii.enumerations.TransactionTypeEnum;
import jakarta.persistence.*;
import jdk.jfr.Timestamp;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "transaction")
public class TransactionEntity {

    @Id
    @GeneratedValue(
            strategy= GenerationType.AUTO,
            generator="native"
    )
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_username", referencedColumnName = "username", nullable = false)
    private UserEntity userEntity;

    @OneToMany
    private Set<CardEntity> cards;

    private int amount;

    private TransactionTypeEnum type;

    @CreationTimestamp
    @Column(updatable = false)
    private Date createdAt;

}
