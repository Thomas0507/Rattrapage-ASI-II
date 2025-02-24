package com.projet_asi_ii.asi_ii.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Table(name = "Collection")
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CollectionEntity {
    @Id
    @GeneratedValue(
            strategy= GenerationType.AUTO,
            generator="native"
    )
    private long id;
    private String name;
    private Date releaseDate;
}
